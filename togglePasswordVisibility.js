$(function ()
{
	$("input[type=password]")
	.each (function ()
	{
		var vMe = $(this);

		$("<div>")
		.addClass ("far fa-eye")
		.attr("title", "Afficher le mot de passe")
		.css (
		{
			position: "absolute",
			left: "100%",
			top: "50%",
			transform: "translate(0px, -50%)",
			paddingLeft: "0.5em",
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
