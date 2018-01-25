import 'p2';
import 'pixi';
import 'phaser';
import CurrencyService from './services/CurrencyService';
import Ticker from './objects/Ticker';
import { IGameConfig } from 'phaser-ce';
import MainState from './state/MainState';
import BootState from './state/BootState';
import TitleState from './state/TitleState';
import IntroState from './state/IntroState';

import '../assets/fonts/Commodore.ttf';
import IntroStoreState from './state/IntroStoreState';
import PlayerService from './services/PlayerService';
import WalletService from './services/WalletService';
import PlayerItemService from './services/PlayerItemService';
import items from './data/items';

// constants
const TRADE_INTERVAL = 1;
const CURRENCY = '$';
const FONT_STYLE = {
    font: 'Commodore',
    fontSize: 16,
    fill: 'white'
};

// Utilities
const rnd = new Phaser.RandomDataGenerator();

// Currencies
const mickCoin: CurrencyService = new CurrencyService(
    rnd,
    'MickCoin',
    'MSC',
    TRADE_INTERVAL,
    1.50
);

const joshCoin: CurrencyService = new CurrencyService(
    rnd,
    'JoshCoin',
    'JTC',
    TRADE_INTERVAL,
    1.50
);

// Player
const wallet = new WalletService();
const playerItems = new PlayerItemService(items);
const player = new PlayerService(wallet, playerItems);

// State
const mainState = new MainState(
    CURRENCY,
    [ mickCoin, joshCoin ],
    FONT_STYLE
);
const introState = new IntroState();
const introStoreState = new IntroStoreState(player);
const titleState = new TitleState(
    FONT_STYLE
);

const bootState = new BootState(
    titleState,
    introState,
    introStoreState,
    mainState
);

const game = new Phaser.Game(
    {
        width: 512,
        height: 384,
        antialias: true,
        state: bootState
    }
);

// Debug
// const x = new Phaser.Graphics(game);
// const y = new Phaser.Graphics(game);

// x.beginFill(0xff0000);
// y.beginFill(0xff0000);
// x.drawRect(0, (game.height / 2), game.width, 2);
// y.drawRect(game.width / 2, 0, 2, game.height);

// game.add.existing(x);
// game.add.existing(y);
