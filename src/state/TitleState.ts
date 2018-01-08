import 'phaser-ce';
import IntroState from './IntroState';

export default class TitleState extends Phaser.State {
    private timer: number;
    private proceed: Phaser.Text;

    constructor (
        private fontStyle: {}
    ) {
        super();
        this.timer = 0;
    }

    public create (
        game: Phaser.Game
    ) {
        // Title
        const title = game.add.text(
            game.width / 2,
            game.height / 2,
            'DAY TRADER',
             Object.assign({}, this.fontStyle, {
                fontSize: 50,
                align: 'center'
            }
        ));

        title.anchor.setTo(0.5);

        // Insert Coins
        this.proceed = game.add.text(
            game.width / 2,
            (game.height / 2) + 100,
            'INSERT BITCOINS\nOR PRESS ANY KEY TO START',
            Object.assign({}, this.fontStyle, {
                align: 'center'
            })
        );

        this.proceed.anchor.setTo(0.5);

        // Input
        game.input.keyboard.onPressCallback = () => {
            game.state.start('intro');
        };
    }

    public update (
        game: Phaser.Game
    ) {
        this.timer += game.time.elapsed;
        // Insert coins blink
        if (this.timer >= 1000 && this.proceed.visible) {
            this.proceed.visible = false;
            this.timer = 500;
        } else if (this.timer >= 1000 && !this.proceed.visible) {
            this.proceed.visible = true;
            this.timer = -250;
        }
    }
}
