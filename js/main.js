requirejs.config({
	paths: {
		"jquery": "vendor/jquery"
	}
});


define(['jquery',  'text!../templates/company.html' ,  'text!../data/products.json'],  function (Application, template, data) {
	var Application = function(options){
		var defaultOptions = {
			widget: "",
			template: null,
			data: {}
    	};
    	this.oOptions = $.extend( defaultOptions,options);
	};
	
    Application.prototype.Init =  function(){
    	var $widget = $("#"+this.oOptions.widget);;
    	if($widget.is("section")){
    		this.loadEvents($widget);
    	} else {
    		throw new Error("widget not exits");
    	}
    };
	
    Application.prototype.loadEvents =  function($widget){
    	$widget.find(".controls").delegate("button", "click", $.proxy(this.manageControls, this) )
    };
    
    Application.prototype.manageControls =  function(event){
    	var $target;
    	// polifil for create  currentTarget prop. on IE (the element who has the delegation is equal to element who fires event)
    	event.currentTarget = event.currentTarget ? event.currentTarget : event.target;
    	event.preventDefault();
    	$target =$(event.currentTarget);
    	switch($target.attr('id')){
    		case "createCompanyBtn":
    			this.createCompanyBtn($target);
    		break;
    		case "bankruptBtn":
    		    this.bankruptBtn();
    		break;
    		case "addProductBtn":
    		    this.addProductBtn();
    		break;
    		case "floatRandomBtn":
    		     this.floatRandomBtn();
    		break;
    		case "encourageMergersBtn":
    		     this.encourageMergersBtn();
    		break;
    	}
    };
	
	Application.prototype.createCompanyBtn =  function($target){
    	var $template = $(this.oOptions.template);
    	$template.find(".name").text($target.siblings("input").val());
    	$("#world").append($template); 
    };

    Application.prototype.bankruptBtn =  function(){
    	var $companyList = $(".world .company").not( ".bankrupt" ),
    	    $randomCompany = $companyList.eq(Math.floor(Math.random()* $companyList.length));
    	$randomCompany.addClass("bankrupt");
    };

    Application.prototype.addProductBtn =  function(){
    	var $companyList = $(".world .company").not( ".bankrupt" ).not( ".public" ),
    	    $randomCompany = $companyList.eq(Math.floor(Math.random()* $companyList.length)),
    	    oData = $.parseJSON(this.oOptions.data),
    	    $listElem = $("<li>"+oData[Math.floor(Math.random()*oData.length)]+"</li>");
    	    $randomCompany.find(".assets").append($listElem);
    };

    Application.prototype.floatRandomBtn =  function(){
    	var $companyList = $(".world .company").not( ".bankrupt" ).not( ".public" ),
    	    $randomCompany = $companyList.eq(Math.floor(Math.random()* $companyList.length));
    	$randomCompany.addClass("public");
    };

    Application.prototype.encourageMergersBtn =  function(){
    	var $companyList = $(".world .company.public").not( ".bankrupt" ),
    	    $template = $(this.oOptions.template),
    	    $randomCompany1,$randomCompany2;

    	if ($companyList.length > 1){
    	    $randomCompany1 = $companyList.eq(Math.floor(Math.random()* $companyList.length)),
    	    $randomCompany2 = $companyList.not($randomCompany1).eq(Math.floor(Math.random()* $companyList.not($randomCompany1).length))
    	    $template.find(".name").text($randomCompany1.find(".name").text() + " " +$randomCompany2.find(".name").text());
    	    $template.find(".assets").html($randomCompany1.find(".assets").html() + $randomCompany2.find(".assets").html());
    	    $randomCompany1.remove();
    	    $randomCompany2.remove();
    	    $("#world").append($template);
    	}
    };

	var controller = new Application({
			widget: "companyListWidget",
			template: template,
			data: data
	    });
	controller.Init();
});