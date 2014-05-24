<?php
/**
 * ownCloud - Calendar App
 *
 * @author Georg Ehrke
 * @copyright 2014 Georg Ehrke <oc.list@georgehrke.com>
 * @author Thomas Müller
 * @copyright 2014 Thomas Müller <>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
use \OCA\Calendar;

$this->create('calendar.view.index', '/')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('ViewController', 'index');
});


$this->create('calendar.settings.getView', '/getView')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('SettingsController', 'getView');
});
$this->create('calendar.settings.setView', '/setView/{view}')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('SettingsController', 'setView');
});


$this->create('calendar.backends.all', '/v1/backends')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('BackendController', 'index');
});
$this->create('calendar.backends.disabled', '/v1/backends-disabled')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('BackendController', 'disabled');
});
$this->create('calendar.backends.enabled', '/v1/backends-enabled')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('BackendController', 'enabled');
});
$this->create('calendar.backends.default', '/v1/backends-default')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('BackendController', 'defaultBackend');
});


$this->create('calendar.calendars.forceUpdate', '/v1/calendars-forceUpdate')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('CalendarController', 'forceUpdate');
});


/* some additional calendar calls */
$this->create('calendar.calendar.export', '/v1/calendars/{calendarId}/export')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('ObjectController', 'export');
});
$this->create('calendar.calendar.export', '/v1/calendars/{calendarId}/import')->post()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('ObjectController', 'import');
});


/* some additional object calls */
$this->create('calendar.object.inPeriod', '/v1/calendars/{calendarId}/objects/inPeriod/{start}/{end}')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('ObjectController', 'inPeriod');
});
$this->create('calendar.event.inPeriod', '/v1/calendars/{calendarId}/events/inPeriod/{start}/{end}')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('EventController', 'inPeriod');
});
$this->create('calendar.journal.inPeriod', '/v1/calendars/{calendarId}/journals/inPeriod/{start}/{end}')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('JournalController', 'inPeriod');
});
$this->create('calendar.todo.inPeriod', '/v1/calendars/{calendarId}/objects/todos/{start}/{end}')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('TodoController', 'inPeriod');
});


/* some additional subscription calls */
$this->create('calendar.subscription.getTypes', '/v1/subscriptions-type')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('SubscriptionController', 'getTypes');
});


/* some additional timezone calls */
$this->create('calendar.timezone.getList', '/v1/timezones-list')->get()->action(function($params){
	$app = new \OCA\Calendar\App($params);
	$app->dispatch('TimezoneController', 'getList');
});

//set up resources
$routes = array(
	'resources' => array(
		'calendar' => array('url' => '/v1/calendars'),
		'object' => array('url' => '/v1/calendars/{calendarId}/objects'),
		'event' => array('url' => '/v1/calendars/{calendarId}/events'),
		'journal' => array('url' => '/v1/calendars/{calendarId}/journals'),
		'todo' => array('url' => '/v1/calendars/{calendarId}/todos'),
		'timezone' => array('url' => '/v1/timezones'),
		'subscription' => array('url' => '/v1/subscriptions'),
	)
);


$a = new \OCA\Calendar\App();
$a->registerRoutes($this, $routes);