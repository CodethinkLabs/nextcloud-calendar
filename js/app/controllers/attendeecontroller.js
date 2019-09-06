/**
 * Calendar App
 *
 * @author Raghu Nayyar
 * @author Georg Ehrke
 * @copyright 2016 Raghu Nayyar <hey@raghunayyar.com>
 * @copyright 2016 Georg Ehrke <oc.list@georgehrke.com>
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

app.controller('AttendeeController', function($scope, AutoCompletionService) {
	'use strict';

	$scope.newAttendeeGroup = -1;
	$scope.nameofattendee = '';
	$scope.mailtoEmail = "mailto:" + $scope.$parent.emailAddress;

	$scope.cutstats = [
		{displayname: t('calendar', 'Individual'), val: 'INDIVIDUAL'},
		{displayname: t('calendar', 'Group'), val: 'GROUP'},
		{displayname: t('calendar', 'Resource'), val: 'RESOURCE'},
		{displayname: t('calendar', 'Room'), val: 'ROOM'},
		{displayname: t('calendar', 'Unknown'), val: 'UNKNOWN'}
	];

	$scope.rolestats = [
		{displayname: t('calendar', 'Required'), val: 'REQ-PARTICIPANT'},
		{displayname: t('calendar', 'Optional'), val: 'OPT-PARTICIPANT'},
		{displayname: t('calendar', 'Does not attend'), val: 'NON-PARTICIPANT'}
	];

	$scope.partstats = [
		{displayname: t('calendar', 'Needs Action'), val: 'NEEDS-ACTION'},
		{displayname: t('calendar', 'Accepted'), val: 'ACCEPTED'},
		{displayname: t('calendar', 'Declined'), val: 'DECLINED'},
		{displayname: t('calendar', 'Tentative'), val: 'TENTATIVE'},
	];

	$scope.$parent.registerPostHook(function() {
		$scope.properties.attendee = $scope.properties.attendee || [];
		if ($scope.properties.attendee.length > 0 && $scope.properties.organizer === null) {
			$scope.properties.organizer = {
				value: 'mailto:' + $scope.$parent.emailAddress.replace("+", "%2b"),
				parameters: {
					cn: OC.getCurrentUser().displayName
				}
			};
		}
	});

	$scope.add = function (email) {
		if (email !== '') {
			$scope.properties.attendee = $scope.properties.attendee || [];
			$scope.properties.attendee.push({
				value: 'mailto:' + email,
				group: $scope.newAttendeeGroup--,
				parameters: {
					'role': 'REQ-PARTICIPANT',
					'rsvp': 'TRUE',
					'partstat': 'NEEDS-ACTION',
					'cutype': 'INDIVIDUAL'
				}
			});
		}
		$scope.attendeeoptions = false;
		$scope.nameofattendee = '';
	};

	$scope.$on('save-contents', function() {
		$scope.add($scope.nameofattendee);
	});

	$scope.remove = function (attendee) {
		$scope.properties.attendee = $scope.properties.attendee.filter(function(elem) {
			return elem.group !== attendee.group;
		});
	};

	$scope.search = function (value) {
		/* Create the organizer if not already set */
		var props = $scope.$parent.properties;
		props.attendee = props.attendee || [];
		if (props.organizer === null) {
			props.organizer = {
				value: 'mailto:' + $scope.$parent.emailAddress.replace("+", "%2b"),
				parameters: {
					cn: OC.getCurrentUser().displayName
				}
			};
		}
		/* XXX: all-day events need to do more than blithely read the start and end times */
		return AutoCompletionService.searchAttendee(value, props.organizer, props.dtstart, props.dtend).then((attendees) => {
			const arr = [];
			attendees.forEach((attendee) => {
				const emailCount = attendee.email.length;
				attendee.email.forEach((email) => {
					let displayname;
					if (emailCount === 1) {
						displayname = _.escape(attendee.name);
					} else {
						displayname = t('calendar', '{name} ({email})', {
							name: attendee.name,
							email: email
						});
					}
					if (attendee.busy) {
						displayname = "(busy) " + displayname;
					}

					arr.push({
						busy: attendee.busy,
						cutype: attendee.type,
						displayname: displayname,
						email: email,
						name: attendee.name
					});
				});
			});

			return arr;
		});
	};

	$scope.selectFromTypeahead = function (item) {
		$scope.properties.attendee = $scope.properties.attendee || [];
		$scope.properties.attendee.push({
			value: 'mailto:' + item.email,
			parameters: {
				cn: item.name,
				role: 'REQ-PARTICIPANT',
				rsvp: 'TRUE',
				partstat: 'NEEDS-ACTION',
				cutype: item.cutype
			}
		});
		$scope.nameofattendee = '';
	};
});
