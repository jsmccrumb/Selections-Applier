define(['jquery', 'qlik', 'css!./FEI-SelectionsApplier.css', './properties'], function ($, qlik, cssContent, properties) {
    var uniq = function(a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    };
    //Helper funciton for adding on a "qv-activate" event of button/link
    var addOnActivateButtonEvent = function ($element,layout,app) {
        $("#applySelections-"+layout.qInfo.qId).on('qv-activate', function () {
            var selectionsInput = document.getElementById("selectionsTextboxArea-"+layout.qInfo.qId).value.split('\n');
            selectionsInput = selectionsInput.filter(function(n){ return n != "" });
            // remove any duplicates to selections array

            selectionsInput = uniq(selectionsInput);
            var selections = layout.isNumeric ? selectionsInput.map(function(item){return parseFloat(item);}) : selectionsInput;
            app.field(layout.field).selectValues(selections, true,true);
        });
    };
    return {
        definition: properties,
        paint: function ($element, layout, jquery,properties) {
            var app = qlik.currApp();
            var buttonHTMLCode = '<button name="ApplySelections" id="applySelections-'+layout.qInfo.qId+'" class="applySelections">Apply Selections'+((layout.field=='')?'':' to '+ layout.field)+'</button>';
            var textboxHTMLCode = '<textarea id="selectionsTextboxArea-'+layout.qInfo.qId+'" style="height: 90%;width: 90%;font-size: 10px;"></textarea>';
            $element.html('<table style="height:100%;text-align: center;"><tr><td style="width:20%;">'+buttonHTMLCode+'</td><td style="width:80%;">'+textboxHTMLCode+'</td></tr></table>');
            addOnActivateButtonEvent($element,layout,app);
        }
    };
});
