/*jslint   browser : true, continue: true,
devel: true, indent: 2, maxerr: 50,
newcap: true, nomen: true, plusplus: true,
regexp: true, sloppy: true, vars: true,
white: true
*/
function extend(subConstructor, superConstrutor){
    subConstructor.prototype = Object.create(superConstrutor.prototype, {
        constructor: {
            value: subConstructor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
}

var BaseClass = function(a){
    this.a = a;
}

BaseClass.prototype.aaa = function(){
    alert(this.a);
}

var InheritClass = function(a){
    this.a = a;
}

InheritClass.prototype = new BaseClass('super');
InheritClass.prototype.super_aaa = InheritClass.prototype.aaa;
InheritClass.prototype.aaa = function(){
    InheritClass.prototype.super_aaa();
    alert(this.a);
}

var spa = (function ($) {
	var configMap = {
		extended_height: 434,
		extended_title: 'click to retract',
		retracted_height: 16,
		retracted_title: 'click to extend',
		template_html: '<div class="spa-slider"></div>'
    },
	$chatSlider,
	toggleSlider, onClickSlider, initModule;
	toggleSlider = function(){
		var slider_height = $chatSlider.height();
		if(slider_height === configMap.retracted_height){
			$chatSlider
				.animate({height: configMap.extended_height})
				.attr('title', configMap.extended_title);
				return true;
		}
		else if(slider_height === configMap.extended_height){
			$chatSlider
				.animate({height: configMap.retracted_height})
				.attr('title', configMap.retracted_title);
			return true;
		}
		return false;
	};

	onClickSlider = function (event) {
		toggleSlider();
        var test = new InheritClass('inherit');
        test.aaa();
		return false;
	};

	initModule = function ( $container ) {
		$container.html(configMap.template_html);
		$chatSlider = $container.find('.spa-slider');
		$chatSlider.attr('title', configMap.retracted_title)
			.click(onClickSlider);
		return true;
	};
	return {initModule: initModule};
}(jQuery));

jQuery(document).ready(
	function(){
		spa.initModule(jQuery('#spa'));
	}
);



