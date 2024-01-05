
class Component {
    constructor(componentType) {
        this.componentType = componentType; //string
        
    }
}


class PositionComponent extends Component {
    constructor(componentType, componentObj){
        // use super when passing other classes constructor param
        super(componentType);

        this.x = componentObj.x;
        this.y = componentObj.y;
        this.width = componentObj.width;
        this.height = componentObj.height;

    }
}

class CollisionComponent extends Component {
    constructor(componentType){
        super(componentType);
    }
}

class MovementComponent extends Component {
    constructor(componentType, componentObj){
        super(componentType);
        this.vX = componentObj.vX;
        this.vY = componentObj.vY;
        this.collisionX = false;
        this.collisionY = false;
    }
}

class TransitionComponent extends Component {
    constructor(componentType, componentObj){
        super(componentType);

        this.screen = componentObj.screen;
        this.coX = componentObj.coX;
        this.coY = componentObj.coY;
    }
}

class SpriteComponent extends Component {
    constructor(componentType, componentObj){
        super(componentType);
        this.sprite = new Image();
        this.sprite.src = componentObj.path;
        this.srcRect = componentObj.srcRect;
        /* srcRect = 
            {
                x,
                y,
                width,
                height
            }

        */
    }
}

class AnimationComponent extends Component {
    constructor(componentType, componentObj){
        super(componentType);
        this.frames = componentObj.frames;
        /*
            {
                down: {
                    move: {
                        // srcRect gets location of correct link on sprite sheet
                        srcRect: [
                            {x,y,width,height},
                            {x,y,width,height}
                        ],
                        currentFrame: 0,
                        numFrames: 2,
                        frameSpeedRate: 3,
                        startTime: Date.Now()
                    },
                    attack: {
                        srcRect: {x,y,width,height},
                        currentFrame: 0,
                        numFrames: 2,
                        frameSpeedRate: 3,
                        startTime: Date.Now()
                    },

                },
                up: {},
                left: {},
                right: {}
            }
        */

        this.currentTimeOfAnimation = componentObj.currentTimeOfAnimation;
        this.facing = componentObj.facing;    // string
        this.shouldAnimate = componentObj.shouldAnimate;
    }
}

export {MovementComponent, PositionComponent, SpriteComponent, AnimationComponent, CollisionComponent, TransitionComponent};