
namespace basic {

    let q_rgbled_array = [0, 0, 0, 0] // speichert 3 LEDs + Helligkeit, wenn nur eine geändert wird
    let q_rgbled_timer = input.runningTime() // ms seit Start, zwischen zwei Aufrufen ist eine Pause erforderlich

    function rgbled_pause() {
        let t = input.runningTime() - q_rgbled_timer // ms seit letztem setLedColors
        if (t < 25)
            basic.pause(t) // restliche Zeit-Differenz bis 25 ms warten
        q_rgbled_timer = input.runningTime()
    }



    // ========== group="RGB LEDs (nur bei Änderung)" advanced=true


    //% group="RGB LEDs (nur bei Änderung)" advanced=true
    //% block="RGB LEDs a %color1 b %color2 c %color3 || Helligkeit %helligkeit \\%" weight=6
    //% color1.shadow="colorNumberPicker" color1.defl=Colors.Off
    //% color2.shadow="colorNumberPicker" color2.defl=Colors.Off
    //% color3.shadow="colorNumberPicker" color3.defl=Colors.Off
    //% brightness.min=5 brightness.max=100 brightness.defl=20
    //% inlineInputMode=inline
    export function setLedColors3(color1: number, color2: number, color3: number, brightness = 20) {
        if (q_rgbled_array[0] != color1 || q_rgbled_array[1] != color2 || q_rgbled_array[2] != color3 || q_rgbled_array[3] != brightness) { // nur wenn Farbe oder Helligkeit geändert
            q_rgbled_array[0] = color1
            q_rgbled_array[1] = color2
            q_rgbled_array[2] = color3
            q_rgbled_array[3] = brightness

            rgbled_pause()
            basic.setLedColors(q_rgbled_array[0], q_rgbled_array[1], q_rgbled_array[2], brightness) // gibt es nur bei v3
        }
    }

    //% group="RGB LEDs (nur bei Änderung)" advanced=true
    //% block="RGB LED %led %color || %on blinken %blinken Helligkeit %helligkeit \\%" weight=5
    //% led.shadow=basicv3_rgbled
    //% color.shadow="colorNumberPicker" color.defl=Colors.Off
    //% on.shadow=toggleOnOff on.defl=1
    //% blinken.shadow=toggleYesNo
    //% helligkeit.min=5 helligkeit.max=100 helligkeit.defl=20
    //% inlineInputMode=inline
    export function setLedColors1(led: number, color: number, on = true, blinken = false, helligkeit = 20) {
        if (!on || (blinken && q_rgbled_array[led] == color)) // entweder aus .. oder an und blinken
            color = Colors.Off // alle Farben aus = 0

        if (q_rgbled_array[led] != color || q_rgbled_array[3] != helligkeit) { // nur wenn Farbe oder Helligkeit geändert

            q_rgbled_array[led] = color
            q_rgbled_array[3] = helligkeit

            rgbled_pause()
            basic.setLedColors(q_rgbled_array[0], q_rgbled_array[1], q_rgbled_array[2], helligkeit)
        }
    }


    //% group="RGB LEDs (nur bei Änderung)" advanced=true
    //% block="RGB LED %led %color0 %on %color1" weight=4
    //% led.shadow=basicv3_rgbled
    //% color0.shadow="colorNumberPicker" color0.defl=Colors.Off
    //% color1.shadow="colorNumberPicker" color1.defl=Colors.Green
    //% on.shadow=toggleOnOff on.defl=1
    //% inlineInputMode=inline
    export function setLedColors2(led: number, color0: number, on = true, color1: number) {
        if (on)
            setLedColors1(led, color1)
        else
            setLedColors1(led, color0)
    }


    //% group="RGB LED" advanced=true
    //% block="%color" weight=1
    //% color.shadow="colorNumberPicker"
    //% blockSetVariable=Farbe
    export function getColorPicker(color: number) { return color }

    export enum eRGBLED { a, b, c } // Index im Array

    //% blockId=basicv3_rgbled block="%led" blockHidden=true
    export function basicv3_rgbled(led: eRGBLED): number {
        return led
    }
}

