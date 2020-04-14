;(function($){
	$.fn.jQSelect = function(settings){
	
		var $div = this;
		var $cartes = $div.find(".cartes");
		var $lists = $div.find(".lists");
		
		var listTxt = $cartes.find(".listTxt");
		var listVal = $cartes.find(".listVal");

		var items = $lists.find("ul > li");
		
		$div.children("div").children("div").click(function(){
			$div.children("div").next().show();
		});
				
		//绑定点击事件
		items.click(function(){
			listVal.val($(this).attr("id"));
			listTxt.val($(this).text());
			$div.removeClass("hover");
			$div.children("div").next().hide();
		}).mouseover(function(){
			$(this).removeClass("cwhite");
			$(this).addClass("cgray");
		}).mouseout(function(){
			$(this).removeClass("cgray");
			$(this).addClass("cwhite");
		});
		
	};
})(jQuery);