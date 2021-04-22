// site.js
// Copyright © 2021 Joel Mussman. All rights reserved.
//

const loadImages = () => {

    // Remove any existing panels.

    $('div.montage').remove()

    // Load a copy of the original image and calculate the new size.

    const montageImage = $('<img>', { class: 'montage', src: 'assets/images/pirate-montage.png' })
    
    montageImage.on('load', function () {

        // Get the top offset; the height below the title.

        const top = $('div.title').offset().top + $('div.title').height()

        // Make the image proportional.

        const newImageHeight = ($(window).height() - top) * 0.85
        const newImageWidth = (newImageHeight * montageImage.prop('naturalWidth')) / montageImage.prop('naturalHeight')

        // Build a list of floating divs, each with the image.

        const montagePanels = []
        const divTop = ($(window).height() - top) * 0.07 + top
        let montageWidth = $(window).width() + newImageWidth

        for (i = 0; montageWidth > 0; i++, montageWidth -= newImageWidth) {

            const newImage = $('<img>', { class: 'montage', src: 'assets/images/pirate-montage.png' })
            const newPanel = $('<div>', { class: 'montage', style: `top: ${divTop}px, left: ${i * newImageWidth}px` })

            newImage.css({ width: newImageWidth, height: newImageHeight })
            newPanel.css({ top: divTop, left: i * newImageWidth });
            newPanel.append(newImage)

            montagePanels.push(newPanel)
            $('body').append(newPanel)
        }

        setInterval(() => {

            // Rotate the images one pixel to the left.

            for (montagePanel of montagePanels) {

                montagePanel.css({ left: montagePanel.offset().left - 1 })               
            }

            // If the first image has rotated off, move it to the end and keep going.

            if (montagePanels[0].offset().left + newImageWidth <= 0) {

                console.log('moving panel')

                const swapPanel = montagePanels.shift();

                swapPanel.css({ left: montagePanels[montagePanels.length - 1].offset().left + newImageWidth })
                montagePanels.push(swapPanel)
            }

        }, 10)
    })
}

const setFooter = () => {
    
    const left = ($(window).width() - $('div.footer').width()) / 2
    const top = $(window).height() - $('div.footer').height() - 20

    $('div.footer').css({ top: top, left: left })
}

$(() => {

    loadImages()
    setFooter()
})

$(window).on('resize', () => {

    loadImages()
    setFooter()
})