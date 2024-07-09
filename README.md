# perfex-dev-tools

## Description
Perfex Dev Tools is a VSCode extension designed to facilitate the development of modules and themes for Perfex CRM. It provides scaffolding tools and useful code snippets to streamline the development process.

## Features
- **Module Creation**: Create new modules with a predefined structure using the command palette.
- **Code Snippets**: Access a variety of snippets for common tasks in Perfex CRM module development.

## Installation
1. Open VSCode.
2. Navigate to the Extensions view by clicking the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.
3. Search for "Perfex Dev Tools".
4. Click Install.

## Usage

### Creating a New Module
1. Open the Command Palette (`Ctrl+Shift+P`).
2. Type `PX make module` and press Enter.
3. Enter the module name when prompted.
4. The extension will generate a new module with the necessary files and structure.

### Available Snippets
Perfex Dev Tools includes several PHP snippets to assist in module development. Below are some examples:

#### Module Activation Hook
```php
/** 
 * Register activation module hook
 */
register_activation_hook(MODULE_NAME, 'module_activation_hook');
function module_activation_hook()
{
    require_once(__DIR__ + '/install.php');
}
```
Trigger: `pxModuleActivationHook`

#### Register Language Files
```php
register_language_files(MODULE_NAME, [MODULE_NAME]);
```
Trigger: `pxRegisterLanguageFiles`

#### Init Menu Items
```php
hooks()->add_action('admin_init', 'module_init_menu_items');
function module_init_menu_items()
{
    if (is_admin()) {
        $CI = &get_instance();
        $CI->app_menu->add_sidebar_menu_item('module-options', [
            'collapse' => true,
            'name'     => _l('module'),
            'position' => 40,
            'icon'     => 'fa fa-cogs',
        ]);
        $CI->app_menu->add_sidebar_children_item('module-options', [
            'slug'     => 'module-guide-options',
            'name'     => _l('module_guide'),
            'href'     => 'example.com',
            'position' => 10,
        ]);
    }
}
```
Trigger: `pxInitMenuItems`

#### Add Settings Tab
```php
hooks()->add_action('admin_init', 'module_add_settings_tab');
function module_add_settings_tab()
{
    $CI = &get_instance();
    $CI->app_tabs->add_settings_tab('module_settings', [
        'name'     => _l('module_settings'),
        'view'     => MODULE_NAME + '/module_settings_view',
        'position' => 101,
    ]);
}
```
Trigger: `pxAddSettingsTab`

#### Register Staff Capabilities
```php
hooks()->add_action('admin_init', 'module_register_staff_capabilities');
function module_register_staff_capabilities()
{
    $capabilities = [];
    $capabilities['capabilities'] = [
        'view'   => _l('permission_view') + '(' + _l('permission_global') + ')',
        'create' => _l('permission_create'),
        'edit'   => _l('permission_edit'),
        'delete' => _l('permission_delete'),
    ];
    register_staff_capabilities('module_capabilities', $capabilities, _l('module_capabilities'));
}
```
Trigger: `pxRegisterStaffCapabilities`

#### Clients Init Hook
```php
hooks()->add_action('clients_init', 'module_clients_init');

function module_clients_init() {
    $button = get_option('module_button_option');
    if ($button != '' && is_client_logged_in()) {
        add_theme_menu_item('module-client', [
            'name'     => _l($button),
            'href'     => site_url('#'),
            'position' => 99,
        ]);
    }
}
```
Trigger: `pxClientsInitHook`

## Configuration
```json
{
  "name": "perfex-dev-tools",
  "displayName": "perfex-dev-tools",
  "description": "Extension que facilite el desarrollo de módulos y temas, que tenga scaffolding y snippets",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.91.0"
  },
  "categories": [
    "Other"
  ],
  "activationEvents": [
    "onCommand:perfex-dev-tools.createModule"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "perfex-dev-tools.createModule",
        "title": "PX make module"
      }
    ],
    "snippets": [
      {
        "language": "php",
        "path": "./snippets/php.json"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTest.js"
  },
  "devDependencies": {
    "@types/vscode": "^1.91.0",
    "@types/glob": "^8.0.0",
    "@types/mocha": "^10.0.0",
    "@types/node": "16.x",
    "@typescript-eslint/eslint-plugin": "^5.42.0",
    "@typescript-eslint/parser": "^5.42.0",
    "eslint": "^8.26.0",
    "glob": "^8.0.3",
    "mocha": "^10.1.0",
    "typescript": "^4.8.4",
    "@vscode/test-electron": "^2.2.0"
  }
}
```

## Contribution
If you find any issues or have suggestions for improvements, please open an issue or a pull request on the [GitHub repository](https://github.com/your-repo-link).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
Special thanks to the Perfex CRM community for their continuous support and feedback.

---

Enjoy coding with Perfex Dev Tools! If you have any questions or need further assistance, feel free to reach out.