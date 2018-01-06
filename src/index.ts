import 'p2';
import 'pixi';
import 'phaser';
import Wallet from './objects/Wallet';
import CurrencyService from './services/CurrencyService';
import Ticker from './objects/Ticker';
import { IGameConfig } from 'phaser-ce';
import MainState from './state/MainState';
import BootState from './state/BootState';

import '../assets/fonts/Commodore.ttf';

// constants
const TRADE_INTERVAL = 1;
const CURRENCY = '$';
const FONT_STYLE = {
    font: 'Commodore',
    fontSize: 16
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

// State
const mainState = new MainState(
    CURRENCY,
    [ mickCoin, joshCoin ],
    FONT_STYLE
);

const bootState = new BootState(
    mainState
);

const game = new Phaser.Game(
    {
        width: 512,
        height: 512,
        antialias: true,
        state: bootState
    }
);
