var KendoUIValidationCheck = function(jQueryValidatorForm){
  var log = function (d) {//顯示log
                    try {
                        console.log(d);
                    } catch (e) { }
                };
   if (jQueryValidatorForm instanceof jQuery || 'jquery' in Object(jQueryValidatorForm)) { 
		       try{
  				var listInput= [];//必備參數
  				const RedPopTop = 30;
  				//目前產生出來的驗證方式
                var PICRule = function (input){
                     var e = input.filter("[type=checkbox]").length && !input.is(":checked"),//如果是checkbox
                                    a = input.val();//輸入值  
                             //驗證規則，判斷是不是null或是不是一個物件，
                             var _ = function (t, e) { return t.length ? null != t[0].attributes[e] : !1 };
                             var ChangeBorder = function (Input) {
                                                    return {
                                                        Add: function AddClass() {

                                                            var str = $(Input).parent();

                                                            if (str != undefined && (str.hasClass("k-state-default") || str.hasClass("k-widget") )) {

                                                                if ($(Input).parent().find('.k-state-default').length > 0) {
                                                                   // log($(Input));
                                                                    $(Input).parent().find('.k-state-default').addClass("UIBorderRed");
                                                                } else {
                                                                  //  log($(Input));
                                                                    $(Input).parent().addClass("UIBorderRed");
                                                                }

                                                            }

                                                            if ($(Input).attr('type') == "checkbox") {
                                                                //log($(Input));
                                                                $(Input).parent().addClass("UIBorderRed");
                                                                
                                                            }
                                                        },
                                                        Remove: function RemoveClass() {
                                                             //log($(Input));
                                                            $(Input).parent().find('.UIBorderRed').andSelf().removeClass("UIBorderRed");

                                                        }
                                                    }
                            };

                                var requiredChangeBorder = function (input, e, a) {
                                    var changeBorder = ChangeBorder(input);
                                    if (!("" === a || !a || e)) {
                                        changeBorder.Remove();
                                    }
                                    else {
                                        changeBorder.Add();
                                    
                                    }
                                };
                          requiredChangeBorder(input, e, a);
                    
                       //為kendo ui 客制化元件
                        $("form .k-widget").bind("mouseenter",function () {
                            var $inputElement = $(this).find(".k-invalid");
                            var position = $(this).position();
                            //log($(this));
                            //log(position.top);
                            // log(position.left);
                            if($inputElement.length >0){//有該元素在
                               
                              var elementName = "div[data-for='" + $inputElement.attr('name') + "']";
                                //log(elementName);
                                $(elementName).addClass('errorTipShow').css({"left" : position.left ,"top" : position.top - RedPopTop});
                            }
                        
                        }).bind("mouseleave",function () {
                            var $inputElement = $(this).find(".k-invalid");
                            var elementName = "div[data-for='" + $inputElement.attr('name') + "']";
                                $(elementName).removeClass('errorTipShow').removeAttr('style');
                        });

                        //為input類型的元件
                        $("form :input").bind("mouseenter",function () {
                            var $inputElement = $(this);
                            var position = $(this).position();
                            if (!$(this).parent().hasClass("k-widget") && !$(this).parent().parent().hasClass("k-widget")) {//排除Kendo UI複合元件

                                if($inputElement.hasClass("k-invalid")){//如果有錯誤發生
                                 
                                  var elementName = "div[data-for='" + $inputElement.attr('name') + "']";
                                    $(elementName).addClass('errorTipShow').css({"left" : position.left ,"top" : position.top - RedPopTop});
                                }
                            }
                        }).bind("mouseleave",function () {
                            var $inputElement = $(this);
                            var elementName = "div[data-for='" + $inputElement.attr('name') + "']";
                                $(elementName).removeClass('errorTipShow').removeAttr('style');;
                        });

                   
                          return !(_(input, "required") && ("" === a || !a || e))
                }

                var CheckKendoUI = function(input){
                   var role = $(input).data("role");
                   var kendoUI;
                   switch(role){
                     case "dropdownlist":
                        kendoUI = $(input).data("kendoDropDownList");
                     	break;
                     case "combobox":
                       kendoUI = $(input).data("kendoComboBox");
                     	break;
                     case "numerictextbox":
                        kendoUI = $(input).data("kendoNumericTextBox");
                     	break;
                     default:
                     	kendoUI = $(input);
                   }
                   
                   return kendoUI;
                }

                 //主要的程式：驗證控制項
                var validator = jQueryValidatorForm.kendoValidator({
                	validateOnBlur:false,
                    rules: {
                        required: function (input) {
                        	 var picRuleCheck = PICRule(input);
                        	   
                        	 if(!picRuleCheck){
                        	   listInput.push(input);
                        	 }
                        	
                             return picRuleCheck;//客制化rule
                        }
                    },
                    errorTemplate: kendo.template( '<div class="errorTip k-widget k-tooltip k-popup"><div class="k-tooltip-content">#=message#</div><div class="k-callout k-callout-s"></div></div>')//樣版
                }).data("kendoValidator");
                }catch(e){
                   log("初始化錯誤!");
                }
                
                try{
                listInput.length = 0;
                var html5Check = $(".k-invalid, .k-textbox.k-invalid");
                    
                if (validator.validate()) {
                       return true;
                } else {
                	if(listInput.length != 0){
                      var input = listInput[0];
					  CheckKendoUI(input).focus();
					}else{
					  html5Check.focus();
					}
					return false;
                }
                }catch(e){
                  log("驗證錯誤!");
                }
                
               
  }else{
      log("該物件非jquery物件");
  }
  
  
}