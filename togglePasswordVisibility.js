/* 
	Add an eye button on the right of password inputs to toggle password visibility
	
	Use : copy this file in custom/javascripts
	
	Author : Yves Gufflet - contact@yvesgufflet.fr
	
	Date : 21/07/2025 
*/

$(function ()
{
	$("input[type=password]")
	.each (function ()
	{
		var vMe = $(this);

		var vZIndex = vMe.css ("zIndex");
		
		if (isNaN (vZIndex)) vZIndex = "auto";
		else vZIndex++;
		
		$("<div>")
		.addClass ("far fa-eye")
		.attr("title", "Afficher le mot de passe")
		.css (
		{
			zIndex : vZIndex,
			position: "absolute",
			right: "0%",
			top: "50%",
			transform: "translate(0px, -50%)",
			paddingRight: "1em",
			fontSize: "1em"
		})
		.on ("click", function ()
		{
			if (vMe.attr ("type") == "password")
			{
				vMe.attr ("type", "text");
				$(this).removeClass ("fa-eye").attr("title", "Masquer le mot de passe").addClass ("fa-eye-slash");
			}
			else
			{
				vMe.attr ("type", "password");
				$(this).addClass ("fa-eye").removeClass ("fa-eye-slash").attr("title", "Afficher le mot de passe");
			}
		})
		.insertAfter ($(this));
	});	
});
