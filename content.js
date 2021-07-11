var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type != 'childList' || mutation.addedNodes.length == 0) {
            return;
        }

        var details = document.querySelectorAll('[class^="style_taskDetailsCell__"]');

        for (var i = 0, l = details.length; i < l; i++) {
            var detail = details[i];

            var octopusLink = detail.childNodes[0];
            var octopusContainer = octopusLink.childNodes[0];

            // Shrink the details cell to make space for the new element
            octopusContainer.setAttribute('style', 'min-width:0 !important');
            octopusLink.setAttribute('style', '');

            var octopusDetails = octopusContainer.childNodes[1];
            var extendedDetails = new ExtendedDetails(octopusDetails);
            detail.appendChild(extendedDetails.buildDetails());

            // Get the tenant stats if available
            if (octopusContainer.childNodes.length == 3) {
                detail.appendChild(octopusContainer.childNodes[2].cloneNode(true));
                octopusContainer.childNodes[2].remove()
            }
            
            // Remove the original element to avoid endless changes
            octopusDetails.remove();
        }
    });
});

mutationObserver.observe(document.documentElement, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false
});

function extractAttribute(text, regex) {
    var result = text.match(regex);

    if (result) {
        return result[0];
    }

    return '';
}