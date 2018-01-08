import 'phaser-ce';

export interface Page {
    text: string;
    read: boolean;
    index: number;
}

export default class SpeechService  {
    private pages: Page[];

    constructor (
        pages: string[]
    ) {
        this.pages = pages.map((page: string) => ({
            text: page,
            index: 0,
            read: false
        }));
    }

    public getText (): string|null {
        const current: Page = this.pages.find((page: Page) => !page.read);
        let text = null;

        if (current !== undefined) {
            current.index++;
            text = current.text.slice(0, current.index);
        }

        return text;
    }

    public next (): void {
        const current: Page = this.pages.find((page: Page) => !page.read);

        if (current !== undefined) {
            const textLength = current.text.length;

            if (current.index < textLength) {
                current.index = textLength;
            } else {
                current.read = true;
                current.index = 0;
            }
        }
    }
}
