// Gib deinen Code hier ein
namespace basic { // basic.ts

    let q_showString = ""

    //% group="LED matrix"
    //% block="zeige Text wenn geändert %text" blockGap=8 weight=96
    //% text.shadow=basic_text
    export function zeige_text(text: any) {
        let tx = convertToText(text)
        if (q_showString != tx) {
            q_showString = tx
            basic.showString(tx)
        }
    }



    // ========== group="Funktionen"

    //% blockId=basic_text block="%s" blockHidden=true
    export function basic_text(s: string): string { return s }

    //% group="Funktionen" advanced=true
    //% block="// %text" weight=9
    //% text.shadow=basic_text
    export function comment(text: any): void { }

    //% group="Funktionen" advanced=true
    //% block="Simulator" weight=7
    export function simulator() {
        return "€".charCodeAt(0) == 8364
    }

    //% group="Funktionen" advanced=true
    //% block="%i0 zwischen %i1 und %i2" weight=6
    export function between(i0: number, i1: number, i2: number): boolean {
        return (i0 >= i1 && i0 <= i2)
    }

    //% group="Funktionen" advanced=true
    //% block="mapInt32 %value|from low %fromLow|high %fromHigh|to low %toLow|high %toHigh" weight=3
    //% fromLow.defl=1 fromHigh.defl=255 toLow.defl=-100 toHigh.defl=100
    //% inlineInputMode=inline
    export function mapInt32(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        // return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
        return Math.idiv(Math.imul(value - fromLow, toHigh - toLow), fromHigh - fromLow) + toLow
    }


} // basic.ts
