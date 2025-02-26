<?php

namespace YesWiki\Custom\Field;

use Psr\Container\ContainerInterface;
use YesWiki\Core\Controller\GroupController;
use YesWiki\Bazar\Field\CheckboxEntryField;
use YesWiki\Bazar\Service\EntryManager;

/**
    * @Field({"membersCheckbox"})
    */
    
class membersCheckboxField extends CheckboxEntryField
{
    protected const GROUPS_LIST = 3;    
    protected const ID_TYPEANNONCE = 1;
    
    protected $groups;
    
    public function __construct(array $values, ContainerInterface $services)
    {
	    parent::__construct($values, $services);
	    
	    $this->groups = explode(',', $values[self::GROUPS_LIST]);
		$this->groups = array_map('trim', $this->groups);
    }

	public function loadOptionsFromEntries()
    {
    	$vGroupController = $this->getService(GroupController::class);	
			
		$gOutput = "";
		
		$vAllMembers = [];
		
		$vGroups = $this->groups;

		foreach ($vGroups as $vGroup)
		{
			$vMembers = $vGroupController->getMembers ($vGroup);
			
			$vAllMembers = array_unique(array_merge($vAllMembers, $vMembers));						
		}
		
		$vOptions = [];

		$entryManager = $this->getService(EntryManager::class);

		$tabquery = [];

        if (!empty($this->queries)) {
            $tableau = [];
            $tab = explode('|', $this->queries);
            //découpe la requete autour des |
            foreach ($tab as $req) {
                $tabdecoup = explode('=', $req, 2);
                $tableau[$tabdecoup[0]] = isset($tabdecoup[1]) ? trim($tabdecoup[1]) : '';
            }
            $tabquery = array_merge($tabquery, $tableau);
        } else {
            $tabquery = '';
        }

		foreach ($vAllMembers as $vMember)
		{		
			$vEntry = $entryManager->search(
            [
	            "user" => $vMember,
                'queries' => $tabquery,
                'formsIds' => $this->getLinkedObjectName(),
                'keywords' => (!empty($this->keywords)) ? $this->keywords : '',
            ],
            true, // filter on read ACL
            true  // use Guard
	        );
		
			if (count ($vEntry) > 0 )
				$vOptions [$vMember] = reset ($vEntry)["bf_titre"];		
		}	
		
		$this->options = $vOptions;

		if (is_array($this->options)) {
            asort($this->options);
        }		
    }
}
