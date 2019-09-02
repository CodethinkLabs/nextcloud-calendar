/**
 * @copyright Copyright (c) 2018 Georg Ehrke
 *
 * @author Georg Ehrke <oc.list@georgehrke.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * returns the version string of the calendar app
 *
 * @returns {String}
 */
export function getAppVersion() {
	return '1'
}

/**
 * returns the version string of the nextcloud server
 *
 * @returns {String}
 */
export function getServerVersion() {
	return OC.config.versionstring
}

/**
 * returns the hostname, needed for UID
 *
 * @returns {String}
 */
export function getHostname() {
	return window.location.hostname
}