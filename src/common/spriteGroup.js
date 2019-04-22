import group from '@data/spriteJson.js'

class Sprite {
    constructor(group, name) {
        this.group = group

        // 该精灵名称
        this.name = name

        // 该精灵原始宽高
        this.width = 0
        this.height = 0

        // 该精灵在雪碧图中的位置
        this.sx = 0
        this.sy = 0

        // 在画布上的位置
        this.dx = 0
        this.dy = 0

        this.spScale = 1
    }

    init({width, height, sx, sy}) {
        this.width = width
        this.height = height
        this.sx = sx
        this.sy = sy
    }

    scale(scale) {
        this.spScale = scale
    }

    moveTo(dx, dy) {
        this.dx = dx
        this.dy = dy
    }

    draw(ctx) {
        ctx.save()
        ctx.drawImage(this.group.img, this.sx, this.sy, this.width, this.height, this.dx, this.dy, this.width * this.spScale, this.height * this.spScale)
        ctx.restore()
    }
}

export default class SpriteGroup {
    constructor(groupName = '') {
        // 所属组的名字、宽高、json数据
        this.groupName = groupName
        this.groupJson = group[groupName]
        this.groupWidth = this.groupJson.meta.width
        this.groupHeight = this.groupJson.meta.height
        this.img = window.imgCache[this.groupName]
    }

    getSprite(name) {
        let json = this.groupJson['sprite'][name]

        let sprite = new Sprite({
            img: this.img,
            width: this.groupWidth,
            height: this.groupHeight
        }, name)

        sprite.init({
            width: json.w,
            height: json.h,
            sx: json.x,
            sy: json.y,
        })

        return sprite
    }
}