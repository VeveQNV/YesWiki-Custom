<?php

namespace YesWiki\Custom\Field;

use Psr\Container\ContainerInterface;
use YesWiki\Bazar\Field\BazarField;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use YesWiki\Core\Controller\GroupController;
use YesWiki\Core\Service\UserManager;
use YesWiki\Bazar\Service\BazarListService;
use YesWiki\Wiki;

/**
    * @Field({"members"})
    */
class membersField extends BazarField
{
    public array $arguments;
    protected $displayFilterLimit;
    protected $wiki;
    
    protected const FIELD_NAME = 1;
    protected const GROUPS_LIST = 3;    
    protected const ID_TYPEANNONCE = 4;
    
    public function __construct(array $values, ContainerInterface $services)
    {
	    parent::__construct($values, $services);
	    $this->wiki = $this->services->get(Wiki::class);
	    $this->arguments = $values;
	    $params = $this->services->get(ParameterBagInterface::class);
	    $this->displayFilterLimit = $params->has('BAZ_MAX_RADIO_WITHOUT_FILTER') ? $params->get('BAZ_MAX_RADIO_WITHOUT_FILTER') : false;
    }

	protected function renderInput($entry)	
	{
		$vGroupController = $this->getService(GroupController::class);	
		$gBazarListService = $this->services->get(BazarListService::class);
		$gUserManager = $this->services->get(UserManager::class);
			
		$gOutput = "";
		
		$vAllMembers = [];
		
		$vGroups = explode(',', $this->arguments[self::GROUPS_LIST]);
		$vGroups = array_map('trim', $vGroups);

		foreach ($vGroups as $vGroup)
		{
			$vMembers = $vGroupController->getMembers ($vGroup);
			
			$vAllMembers = array_unique(array_merge($vAllMembers, $vMembers));						
		}
		
		$vOptions = [];
		
		foreach ($vAllMembers as $vMember)
		{					
			$vOptions [$vMember] = $gBazarListService->getEntries(["idtypeannonce" => $this->arguments[self::ID_TYPEANNONCE], "user" => $vMember])[0]["bf_titre"];
		}
		
		if ($this->displayFilterLimit && (count($vOptions) > $this->displayFilterLimit)) {
            // javascript additions
            $this->wiki->AddJavascriptFile('tools/bazar/libs/vendor/jquery.fastLiveFilter.js');
            $script = "$(function() { $('.filter-entries').each(function() {
                        $(this).fastLiveFilter($(this).siblings('.bazar-radio-rows')); });
                    });";
            $this->wiki->AddJavascript($script);
        }
	
		return $this->render('@bazar/inputs/radio.twig', [
			 'options' => $vOptions,
             'value' => $this->getValue($entry),
			 'displayFilterLimit' => $this->displayFilterLimit		
        ]);		
	}
	
	protected function renderStatic($entry)
	{	
		$gBazarListService = $this->services->get(BazarListService::class);
		$vUser = $gBazarListService->getEntries(["idtypeannonce" => $this->arguments[self::ID_TYPEANNONCE], "user" => $entry[$this->arguments[self::FIELD_NAME]]])[0];
			
		return $this->render("@custom/fields/members.twig", [
		'entry_id' => $vUser['id_fiche'],
		'titre' => $vUser['bf_titre'],
		]);
	}
}
