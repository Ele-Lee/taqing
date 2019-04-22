import eventLis from '@common/eventLis';
var frameJSON = {
    frames: [
        {
            filename: '001.png',
            frame: { x: 2, y: 2, w: 211, h: 245 },
            rotated: false,
            trimmed: false,
            spriteSourceSize: { x: 0, y: 0, w: 211, h: 245 },
            sourceSize: { w: 211, h: 245 }
        },
        {
            filename: '002.png',
            frame: { x: 215, y: 2, w: 211, h: 245 },
            rotated: false,
            trimmed: false,
            spriteSourceSize: { x: 0, y: 0, w: 211, h: 245 },
            sourceSize: { w: 211, h: 245 }
        },
        {
            filename: '003.png',
            frame: { x: 428, y: 2, w: 211, h: 241 },
            rotated: false,
            trimmed: true,
            spriteSourceSize: { x: 0, y: 4, w: 211, h: 241 },
            sourceSize: { w: 211, h: 245 }
        }
    ],
    meta: {
        app: 'http://www.codeandweb.com/texturepacker ',
        version: '1.0',
        image: 'Untitled.png',
        format: 'RGBA8888',
        size: { w: 641, h: 249 },
        scale: '1',
        smartupdate: '$TexturePacker:SmartUpdate:73def39e177a8942f90c1abf0517e617:1/1$'
    }
};

function game(jsonConfig, gameDom, gameCb, _needGuide) {
    // 初始化hwsdk
    // hwsdk.init();

    var myEventList = new eventLis();
    var game_width = window.innerWidth;
    var game_height = window.innerHeight;
    var Game = function(config, domId, __needGuide) {
        this.config = config;
        this.domId = domId || '';
        this.needGuide = !!__needGuide;
    };

    /* 游戏属性 */
    Game.prototype = {
        // 得分
        score: 0,
        // 初始化标记
        isInit: false,
        // 音乐管理器
        musicManager: null,
        // 插入的domId
        domId: null,
        // 设备信息
        device: {
            type: null,
            platform: null,
            width: 0,
            height: 0
        },
        // 画布大小
        canvasSize: {
            width: 0,
            height: 0,
            ratio: 0
        },
        // phaser游戏对象实例
        instance: null,
        // 是否已经播放过音乐了
        playedMusic: false,

        // 初始化-设备信息
        initDevice: function() {
            this.device.width = game_width;
            this.device.height = game_height;
            // if (game_width > game_height) {
            //     this.device.width = game_height;
            //     this.device.height = game_width;
            // }
            this.device.platform = navigator.userAgent.toLowerCase().indexOf('android') < 0 ? 'apple' : 'android';
            this.device.type = this.device.width > 700 ? 'pad' : 'mobile';
        },
        // 初始化-画布大小
        initCanvasSize: function() {
            this.canvasSize.width = game_width * 2;
            // this.canvasSize.width = game_width * 2 / 1.5625;
            this.canvasSize.height = game_height * 2;
            this.canvasSize.ratio = this.canvasSize.width / this.canvasSize.height;
        },
        toPlayMusic: function() {
            if (!this.playedMusic) {
                this.musicManager.play('bgm', true);
                this.playedMusic = true;
            }
        },
        // 初始化-游戏
        init: function() {
            // 显示加载页面
            // hwsdk.showLoadingPage();
            var self = this;
            // 初始化设备信息
            this.initDevice();
            // 初始化画布大小
            this.initCanvasSize();
            // 设置已进入初始化阶段
            this.isInit = true;
            // 创建游戏实例
            this.instance = new Phaser.Game(this.canvasSize.width, this.canvasSize.height, Phaser.AUTO, gameDom);
            // 创建游戏状态
            this.instance.States = {};

            var game = this.instance;
            // State - boot
            // 加载加载页所需资源
            game.States.boot = function() {
                this.preload = function() {
                    // 设置画布大小
                    $(game.canvas).css('width', self.canvasSize.width / 2);
                    $(game.canvas).css('height', self.canvasSize.height / 2);
                    // 设置默认背景颜色
                    game.stage.backgroundColor = '#aaa';
                };
                this.create = function() {
                    // 进入preload状态
                    game.state.start('preload');
                };
            };

            // State - preload
            // 加载游戏所需资源
            game.States.preload = function() {
                this.preload = function() {
                    // 说明：加载页面至少显示3秒，由deadline控制是否允许进入下一个状态
                    var deadLine = true;
                    // 加载完成回调
                    function callback() {
                        if (deadLine == true) {
                            // 到deadline了
                            //  // 进入create状态
                            game.state.start('create');
                        } else {
                            // 还没到deadline
                            setTimeout(function() {
                                callback();
                            }, 1000);
                        }
                    }
                    game.load.crossOrigin = 'Anonymous';
                    // 全部文件加载完成
                    game.load.onLoadComplete.add(callback);
                    // 文件加载完成
                    game.load.onFileComplete.add(function(progress) {
                        // hwsdk.configLoadingPage({ progress: progress });
                    });

                    var config = self.config['game'];

                    // 加载资源
                    // game.load.image('bga', '//24haowan-cdn.shanyougame.com/running/assets/images/bga.png');
                    // game.load.image('star', '//24haowan-cdn.shanyougame.com/running/assets/images/star.png');
                    // game.load.image('die', '//24haowan-cdn.shanyougame.com/running/assets/images/die.png');
                    // game.load.image('barrier', config['barrier']);
                    // game.load.image('trap', config['trap']);
                    // game.load.image('money', config['money']);
                    // game.load.image('fence', config['fence']);
                    // game.load.atlasJSONArray('role', config['m'][0], config['m'][1]);

                    game.load.atlasJSONArray('role', require('@imgs/game__man.png'), null, frameJSON);

                    game.load.image('handL', require('@imgs/game__handL.png'));
                    game.load.image('handR', require('@imgs/game__handR.png'));
                    game.load.image('dollar', require('@imgs/game__$.png'));
                    for(let i = 1; i < 9; i++) {
                        game.load.image('gift' + i, require('@imgs/game__gift' + i + '.png'));
                    }
                    // game.load.image('gift2', require('@imgs/game__gift2.png'));
                    game.load.image('clock', require('@imgs/game__clock.png'));
                    // todo: need a complete img
                    game.load.image('bga', require('@imgs/game__bg.png'));
                    //加载音效
                    // todo 背景音乐相关
                    // game.load.audio('bgm', config['music_bgm']);

                    if (self.device.platform != 'android') {
                        game.load.audio('eat', config['music_money']);
                        game.load.audio('hit', config['music_hit']);
                    }
                };
            };

            // State - create
            // 开始界面
            game.States.create = function() {
                this.create = function() {
                    // 创建音乐管理器
                    self.musicManager = new MusicManager(game, self.device, ['bgm', 'eat', 'hit']);

                    game.state.start('play');
                };
            };

            // State - play
            // 游戏界面

            //初始化数据
            var side;

            var center;
            var left;
            var right;

            var role;
            var monster = [];
            var i = 0;

            var btnLock = true;
            var scoreT = 0;
            var scoreText;
            // var star;
            //游戏的速度,会随着时间而增加,同时,到了800以后不再增加,而是生成两个障碍物
            var speed = 160;
            // var scroll = 0;
            // var scoreScroll = 0;
            // TAP锁,防止重复触发TAP函数
            var tapLock = false;
            //是否生成两个障碍物
            var isTwo = false;
            // var createSpeed = 800;

            // 上次的跑道的序号
            var lastSide = -1;

            var giftValue = 4;
            // 奖品的分数映射
            var scoreMap = {
                1: 1,
                2: 1,
                3: 4,
                4: 4,
                5: 6,
                6: 6,
                7: 9,
                8: 9
            }
            // var giftTotal = 25,
            //     giftSide = [10, 10, 10];
            var giftTotal, giftSide;

            var clock,
                dollar,
                gameTimer,
                time = 30,
                time_label;

            var flag_trigger;
            var tween;
            var index;

            game.States.play = function() {
                this.create = function() {
                    // if (!self.playedMusic) {
                    //     game.paused = true;
                    // }
                    btnLock = true;
                    //跳跃的时间,会随着速度增加而减少跳跃时间
                    // jumpTime = 0;
                    giftTotal = 25;
                    giftSide = [10, 10, 10];
                    scoreT = 0;
                    scoreText = 0;
                    time = 30;
                    speed = 400;
                    // scroll = 0;
                    // scoreScroll = 0;
                    // TAP锁,防止重复触发TAP函数
                    tapLock = false;
                    //是否生成两个障碍物
                    isTwo = false;
                    // createSpeed = 800;

                    flag_trigger = false;
                    tween = [];
                    index = 0;

                    myEventList.delLis();

                    //添加这段解决电脑无法调试的BUG
                    if (
                        'ontouchstart' in document.documentElement ||
                        ((window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1) || flag_trigger)
                    ) {
                    } else {
                        flag_trigger = true;
                        var positionX, positionY;
                        $('body').on('mousedown', function(e) {
                            positionX = e.clientX - (game_width - game_width) / 2;
                        });
                        $('body').on('mouseup', function(e) {
                            var diffX = e.clientX - (game_width - game_width) / 2 - positionX;
                            //左右
                            if (diffX > 30) {
                                //右边
                                $('body').trigger('swipeRight');
                            } else if (diffX < -30) {
                                //左边
                                $('body').trigger('swipeLeft');
                            } else {
                                $('body').trigger('tap');
                            }
                        });
                    }

                    // if ($('.pause-mask').css('display') == 'block') game.paused = true;

                    side = (game.world.width / 3) * 0.64;

                    center = game.world.centerX;
                    left = center - side;
                    right = center + side;

                    //新方法
                    var bgTP = game.add.image(0, 0, 'bga');
                    bgTP.destroy();

                    var bga = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bga');
                    var bgas = game.world.width / bgTP.width;
                    bga.tileScale.setTo(bgas, bgas);
                    bga.autoScroll(0, speed / bgas);

                    role = game.add.sprite(0, 0, 'role');
                    role.animations.add('run', [0, 1], 5, true);
                    role.animations.add('jump', [2], 5, true);

                    role.animations.play('run');

                    role.anchor.setTo(0.5, 1);
                    //对人物角色进行等比缩放处理,同时保证缩放后,在一个side*0.8 * side*0.8的容器中
                    var rate = role.width > role.height ? (side * 0.8) / role.width : (side * 0.8) / role.height;
                    role.scale.setTo(rate, rate);
                    role.position.x = center;
                    role.position.y = game.world.height * 0.8;
                    game.physics.enable(role, Phaser.Physics.ARCADE);

                    role.body.setSize(role.width * 0.5, role.height * 0.5, role.width * 0.25, role.height * 0.25);

                    // 添加倒计时
                    clock = game.add.image(0, 0, 'clock');
                    clock.anchor.setTo(0, 0);
                    clock.position.x = game.world.width * 0.05;
                    clock.position.y = game.world.height * 0.05;
                    time_label = game.add.text(clock.x + clock.width * 0.5 + 12, clock.y + 24, '30', {
                        fontSize: '48px',
                        fill: '#ffffff'
                    });
                    time_label.anchor.setTo(0, 0);
                    gameTimer = game.time.create(true);
                    gameTimer.loop(1000, function() {
                        // 更新右上角文本
                        if (time == 0) {
                            // 游戏结束
                            time_label.text = '00';
                            gameTimer.stop(true);
                            // game.state.start('end');
                            myEventList.delLis();

                            setTimeout(function() {
                                gameCb(scoreT);
                            }, 300);
                            gameManager.instance.paused = true;
                        } else {
                            time_label.text = --time < 10 ? '0' + time : time;
                        }
                        if (giftTotal === 0) {
                            return;
                        }
                        var tempInx = game.rnd.between(0, 2);
                        var checkSide = function(i) {
                            if (lastSide === i) {
                                i = ++i > 2 ? 0 : i;
                            }
                            if (giftSide[i] === 0) {
                                i = ++i > 2 ? 0 : i;
                            } else {
                                giftSide[i]--;
                            }
                            lastSide = i;
                            return i;
                        };
                        tempInx = checkSide(tempInx);

                        createMonster('gift' + giftTotalList.shift(), posin[tempInx], speed, false);
                        // createMonster(giftList[game.rnd.between(0, giftListLast)], posin[tempInx], speed, false);
                    });
                    // gameTimer.start();

                    // 分数展示
                    dollar = game.add.image(game.world.width * 0.8, clock.y + 24, 'dollar');
                    dollar.anchor.setTo(0, 0);
                    scoreText = game.add.text(game.world.width * 0.85, clock.y + clock.height / 2, scoreT, {
                        fontSize: '50px',
                        fill: '#FAF8EF'
                    });
                    scoreText.anchor.setTo(0, 0.5);
                    if (self.needGuide) {
                        game.time.events.add(0, guideR, this);
                        game.time.events.add(1500, guideRT, this);
                        game.time.events.add(2000, guideL, this);
                        game.time.events.add(3500, guideLT, this);
                        game.time.events.add(
                            6000,
                            function() {
                                //引导关结束后开始递增速度
                                // speedAdd.start();
                                //引导关结束后开始正式生成障碍物,同时障碍物的生成速度会分段改变
                                // monsterCreateSpeed.start();
                                // monsterTimer1.start();
                                giftTotal += 2;
                                scoreT = 0;
                                scoreText.setText(scoreT);
                                gameTimer.start();
                            },
                            this
                        );
                    } else {
                        game.time.events.add(
                            100,
                            function() {
                                scoreT = 0;
                                scoreText.setText(scoreT);
                                gameTimer.start();
                                // monsterCreateSpeed.start();
                                // monsterTimer1.start();
                            },
                            this
                        );
                    }

                    function guideR() {
                        createMonster('gift1', right, speed);
                        // createMonster('money', left, speed);
                    }

                    function guideRT() {
                        var group = game.add.group();
                        group.create(0, 0, 'handR');
                        //group.anchor.setTo(0.5,1);
                        group.position.x = center - group.width / 2;
                        group.position.y = game.height * 0.5;
                        //tween
                        game.add.tween(group).to({ x: right - group.width / 2 }, 1000, null, true, 200, 0, false);
                        game.add.tween(group).to({ alpha: 0 }, 1000, null, true, 200, 0, false);
                    }

                    function guideL() {
                        createMonster('gift2', center, speed);
                    }

                    function guideLT() {
                        // canJump = true;
                        var group = game.add.group();
                        group.create(0, 0, 'handL');
                        //group.anchor.setTo(0.5,1);
                        group.position.x = center - group.width / 2;
                        group.position.y = game.height * 0.5;
                        //tween
                        game.add.tween(group).to({ x: left - group.width / 2 }, 1000, null, true, 200, 0, false);
                        game.add.tween(group).to({ alpha: 0 }, 1000, null, true, 200, 0, false);
                    }

                    var _giftTypeMap = {
                        1: 10,
                        2: 10,
                        3: 6,
                        4: 6,
                        5: 5,
                        6: 5,
                        7: 4,
                        8: 4
                    };
                    var giftTotalList = [];
                    for (var item in _giftTypeMap) {
                        giftTotalList = giftTotalList.concat(new Array(_giftTypeMap[item]).fill(item));
                    }
                    var shuffle = function(arr) {
                        var result = [],
                            random;
                        while (arr.length > 0) {
                            random = Math.floor(Math.random() * arr.length);
                            result.push(arr[random]);
                            arr.splice(random, 1);
                        }
                        return result;
                    };
                    giftTotalList = shuffle(giftTotalList);
                    var giftList = ['gift1', 'gift2'];
                    var giftListLast = giftList.length - 1;
                    // var giftList = ['fence', 'trap', 'money', 'barrier'];
                    var posin = [left, center, right];

                    // game.time.advancedTiming = true;

                    myEventList.setup(document.querySelector('#' + gameDom)).listen({
                        onEnd: dir => {
                            if (gameManager.instance.paused) return;
                            if (dir > 0) {
                                if (role.position.x == left) {
                                    game.add.tween(role).to({ x: center }, 100, null, true, 0, 0, false);
                                } else {
                                    game.add.tween(role).to({ x: right }, 100, null, true, 0, 0, false);
                                }
                            } else if (dir < 0) {
                                if (role.position.x == right) {
                                    game.add.tween(role).to({ x: center }, 100, null, true, 0, 0, false);
                                } else {
                                    game.add.tween(role).to({ x: left }, 100, null, true, 0, 0, false);
                                }
                            }
                        }
                    });

                    // 参数分别是 控制怪物类型,位置
                    function createMonster(obj, pos, speed, willBeTwo) {
                        // if (!self.needGuide) {
                            --giftTotal;
                            if (giftTotal < 0) return;
                        // }
                        var rndY = self.needGuide ? 0 : game.rnd.between(0, 60);
                        monster[i] = game.add.sprite(pos, 0 + rndY, obj);
                        monster[i].anchor.setTo(0.5, 1);
                        //加上宽高约束缩放
                        // var rateF =
                        //     monster[i].width > monster[i].height
                        //         ? (side * 0.5) / monster[i].width
                        //         : (side * 0.5) / monster[i].height;

                        monster[i].scale.setTo(0.8);

                        monster[i].outOfBoundsKill = true;
                        monster[i].checkWorldBounds = true;

                        game.physics.enable(monster[i], Phaser.Physics.ARCADE);

                        monster[i].body.velocity.y = speed;
                        i++;
                        // if (willBeTwo) {
                        //     var nPos = posin[game.rnd.between(0, 2)];
                        //     var nObj = giftList[game.rnd.between(0, giftListLast)];
                        //     while (nPos == pos) {
                        //         nPos = posin[game.rnd.between(0, 2)];
                        //     }
                        //     monster[i] = game.add.sprite(nPos, 0, nObj);
                        //     monster[i].anchor.setTo(0.5, 1);

                        //     var rateF =
                        //         monster[i].width > monster[i].height
                        //             ? (side * 0.5) / monster[i].width
                        //             : (side * 0.5) / monster[i].height;
                        //     monster[i].scale.setTo(rateF, rateF);

                        //     monster[i].outOfBoundsKill = true;
                        //     monster[i].checkWorldBounds = true;

                        //     game.physics.enable(monster[i], Phaser.Physics.ARCADE);
                        //     monster[i].body.velocity.y = speed;
                        //     i++;
                        // }
                    }

                    game.paused = true;
                };

                this.update = function() {
                    // 每一帧更新都会触发

                    game.world.bringToTop(clock);
                    game.world.bringToTop(time_label);
                    game.world.bringToTop(role);
                    //碰撞判断 还没处理跳高判断
                    // 增加跳高处理 tapLock为FALSE时,此时为非跳跃状态 可以判断死亡

                    // if (jumpComplete) {
                    for (var i = 0, len = monster.length; i < len; i++) {
                        game.physics.arcade.overlap(
                            role,
                            monster[i],
                            function() {
                                this.lap(monster[i]);
                            },
                            null,
                            this
                        );
                    }
                    // }
                };

                //碰撞回调
                this.lap = function(obj, Z) {
                    // if (obj.key == 'money') {

                    self.musicManager.play('eat', false);
                    //替换资源,撞到之后把金币删除,换新的图片替代做动画,避免重复吃到金币
                    var n = game.add.image(obj.position.x, obj.position.y, obj.key);
                    n.anchor.setTo(0.5, 1);
                    //加上宽高约束缩放
                    var rateF = n.width > n.height ? (side * 0.5) / n.width : (side * 0.5) / n.height;
                    n.scale.setTo(rateF, rateF);

                    obj.destroy();

                    game.world.bringToTop(n);
                    tween[index] = game.add.tween(n, n).to(
                        { x: dollar.x + scoreText.width, y: dollar.y + +scoreText.height },
                        // { x: center - 40, y: game.world.height * 0.06 + star.height },
                        600,
                        null,
                        true,
                        0,
                        0,
                        false
                    );
                    game.add.tween(n.scale).to({ x: 0.5, y: 0.5 }, 600, null, true, 0, 0, false);

                    tween[index].onComplete.add(function() {
                        var str = obj.key;
                        scoreT += scoreMap[str.charAt(str.length - 1)];
                        scoreText.setText(scoreT);
                        this.kill();
                    }, n);
                    index++;
                    // }
                    //  else {
                    //     self.musicManager.play('hit', false);
                    //     var die = game.add.image(obj.position.x, obj.position.y, 'die');
                    //     die.anchor.setTo(0.5, 1);
                    //     var rate = (side * 0.8) / die.width;
                    //     die.scale.setTo(rate, rate);
                    //     this.gameEnd();
                    // }
                };

                // 游戏结束
                this.gameEnd = function() {
                    var score = scoreT;
                    game.state.start('end');
                    // gameManager.instance.paused = true;

                    //alert("得分是: " + scoreT);
                };
            };

            // State - end
            // 游戏结束界面
            game.States.end = function() {
                this.create = function() {
                    // 游戏结束
                    // setTimeout(function() {
                    //     gameCb(scoreT);
                    // }, 300);
                    // game.state.start('play');
                    // gameManager.instance.paused = true;
                };
            };

            // 添加游戏状态
            game.state.add('boot', game.States.boot);
            game.state.add('preload', game.States.preload);
            game.state.add('create', game.States.create);
            game.state.add('play', game.States.play);
            game.state.add('end', game.States.end);
            game.state.start('boot');
        }
    };

    /* 音乐管理器 */
    var MusicManager = function(gameInstance, deviceInfo, assets) {
        this.gameInstance = gameInstance;
        this.deviceInfo = deviceInfo;
        this.assets = assets;
        this.init();
    };
    MusicManager.prototype = {
        // 游戏实例
        gameInstance: null,
        // 设备信息
        deviceInfo: null,
        // 资源
        assets: null,
        // 音乐对象
        musicObject: null,
        // 静音标记
        isBaned: false,
        // 是否播放中
        isPlaying: false,
        // 正在播放列表
        playingList: [],
        // 初始化
        init: function() {
            var self = this;
            if (this.assets) {
                this.musicObject = {};
                for (var index = 0, len = this.assets.length; index < len; index++) {
                    var audio = this.gameInstance.add.audio(this.assets[index]);
                    audio.name = this.assets[index];
                    audio.onPause.add(function() {
                        self.playingList = self.playingList.splice(self.playingList.indexOf(audio.name), 1);
                        if (self.playingList.length == 0) self.isPlaying = false;
                    });
                    audio.onStop.add(function() {
                        self.playingList = self.playingList.splice(self.playingList.indexOf(audio.name), 1);
                        if (self.playingList.length == 0) self.isPlaying = false;
                    });
                    this.musicObject[this.assets[index]] = audio;
                }
            }
        },
        // 播放
        play: function(assetName, loop) {
            if (!this.isBaned) {
                var playTag = false;
                if (this.deviceInfo.platform == 'apple') {
                    playTag = true;
                } else if (this.deviceInfo.platform == 'android' && !this.isPlaying) {
                    playTag = true;
                }
                if (playTag) {
                    if (loop) {
                        if (!this.musicObject[assetName].isPlaying) {
                            this.musicObject[assetName].loopFull();
                            this.playingList.push(assetName);
                        }
                    } else {
                        this.musicObject[assetName].play();
                        if (!this.musicObject[assetName].isPlaying) {
                            this.playingList.push(assetName);
                        }
                    }
                    this.isPlaying = true;
                }
            }
        },
        resume: function() {
            for (var item in this.playingList) {
                var name = this.playingList[item];
                this.musicObject[name].resume();
            }
            this.isPlaying = true;
        },
        pause: function() {
            for (var item in this.playingList) {
                var name = this.playingList[item];
                this.musicObject[name].pause();
            }
            this.isPlaying = false;
        },
        stop: function() {
            for (var item in this.playingList) {
                var name = this.playingList[item];
                this.musicObject[name].stop();
            }
            this.isPlaying = false;
            this.playingList = [];
        },
        ban: function() {
            this.isBaned = true;
            this.pause();
        },
        disban: function() {
            this.isBaned = false;
            this.resume();
        }
    };

    //启动游戏
    gameManager = new Game(jsonConfig, gameDom, _needGuide);
    orientationChange();
    // //绑定屏幕旋转事件
    // hwsdk.onOrientationChanged(orientationChange);
    // //根据设备屏幕方向启动游戏与否
    function orientationChange(direction) {
        if (gameManager.isInit) game.paused = false;
        if (!gameManager.isInit) gameManager.init();
        // if (direction == 'portrait') {
        //     // 手机竖屏
        //     hwsdk.hideRotateMask();
        //     // phaser开始游戏
        //     if (gameManager.isInit) game.paused = false;
        //     if (!gameManager.isInit) gameManager.init();
        // } else if (direction == 'landscape') {
        //     //手机横屏
        //     hwsdk.showRotateMask();
        //     // phaser暂停游戏
        //     if (gameManager.isInit) game.paused = true;
        // } else if (hwsdk.detectDevice() == 'pc') {
        //     //PC直接启动
        //     gameManager.init();
        // } else if (direction == 'undefined' && hwsdk.detectDevice() == 'mobile') {
        //     //PC开发者工具手机模式直接启动
        //     gameManager.init();
        // }
    }
}

export default game;
