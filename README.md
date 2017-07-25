# adapt-graphicAudio 

**Graphic with Audio** displays graphic content that has been optimized for various devices. The component swaps out images based upon the device's screen size. These device widths are specified in *less/generic.less* of the [Vanilla theme](https://github.com/adaptlearning/adapt-contrib-vanilla). When the graphic is clicked, the associated audio will play. The component will mark as completed only once the user has clicked to play the audio.

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `graphicaudio`.

**_classes** (string): CSS class name to be applied to **Graphic**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.  

**_graphic** (object): The image that constitutes the component. It contains values for **alt**, **large**, and **small**.

>**alt** (string): This text becomes the image’s `alt` attribute. 

>**large** (string): File name (including path) of the image used with large device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).  

>**small** (string): File name (including path) of the image used with small device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).  

>**attribution** (string): Optional text to be displayed as an [attribution](https://wiki.creativecommons.org/Best_practices_for_attribution). By default it is displayed below the image. Adjust positioning by modifying CSS. Text can contain HTML tags, e.g., `Copyright © 2015 by <b>Lukasz 'Severiaan' Grela</b>`  

**_audio** (string): File name (including path) of the audio file that will be played when the graphics is clicked. Path should be relative to the *src* folder (e.g., *course/en/audio/audio-1.mp3*).

## Events
The component will broadcast a `media:stop` event when playback is initiated to notify other plugins to stop/pause media playback.

## Limitations
 
Uses HTML5 audio therefore has no IE8 support.

This component requires at least v2.0.15 of the Framework as it relies on the `preRemove` event to stop audio when the user navigates away from the page. 

----------------------------
**Version number:**  0.0.1   
**Framework versions:** 2.0.15  
**RTL support:** yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge 12, IE 11, IE10, IE9, IE Mobile 11, Safari for iPhone (iOS 8+9), Safari for iPad (iOS 8+9), Safari 8, Opera    