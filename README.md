# Sprint1-FullStack

Project Documentation
MyApp CLI and Web Application:

Introduction
MyApp is a Full Stack project designed to provide a simple Command Line Interface (CLI) and a web application for managing user accounts. The CLI helps in configuration, system administration, and user management tasks, while the web interface allows new users to generate tokens for account confirmation.

Installation:
Prerequisites
• Node.js (version 14 or higher)
• npm

Steps:

1. Clone the repository:
2. Navigate to the project directory:

- cd myapp

3. Install the dependencies:

- npm install

Usage:
CLI Commands
• Initialize the Application

- myapp init
  Initializes the directory structure, adds default configuration, help files and creates the folder structures and configuration files.

• View the Current Configuration

- myapp config --show
  Displays the current configuration settings.

• Update the Configuration

- myapp config --set <option> <values>
  Updates the configuration file with new values.

• Reset the Configuration

- myapp config --reset
  Resets the configuration file to its original state.

• Generate a User Token

- myapp token --new <username>
  Generates a token for confirming a new user.

• Update User Information

- myapp token --upd p <username> <phone>
- myapp token --upd e <username> <email>
  Updates user record with new email and/or phone number.

• Search for a User

- myapp token --search u <username>
- myapp token --search e <email>
- myapp token --search p <phone>
  Searches for a user record by username, email, or phone number.

Project Structure:
• myapp.js: The entry point for the CLI.
• json/config.json: Configuration file for the application.
• json/token.json: Token file storing user information.
• Help/usage.txt: Help for user commands.
• index.html: Web form for generating user tokens.
• package.json: Node.js project metadata and dependencies.
• README.md: Project documentation.

Configuration:
The default configuration file is json/config.json. It contains settings like the application name, version, description, main, super user and database. You can update these settings using the CLI command myapp config --set.

Web Interface:
The web interface allows new users to generate a token for account confirmation. The token generation web form can be accessed by opening the index.html file in a web browser.

Running the Web Interface

1. Start the server, node server.
2. Enter the username and click "Generate Token" to receive a confirmation token.
3. Click “token count” to see the number of tokens created.
