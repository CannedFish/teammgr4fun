'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core', ['ui.bootstrap']);
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);
