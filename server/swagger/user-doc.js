/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 * definition:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       phone_number:
 *         type: string
 *         minLength: 11
 *         maxLength: 11
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *       role:
 *         type: string
 *         format: uuid
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   UserModel:
 *     properties:
 *       user:
 *         $ref: '#/definitions/User'
 *   LoginModel:
 *     properties:
 *       user:
 *         $ref: '#/definitions/Login'
 *   Role:
 *     properties:
 *       name:
 *         type: string
 *         minLength: 5
 *         maxLength: 20
 *       display_name:
 *         type: string
 *         minLength: 5
 *         maxLength: 50
 *       description:
 *         type: string
 *       permissions:
 *         type: array
 *         items:
 *           type: string
 *   UserObject:
 *     properties:
 *       username:
 *         type: string
 *       phone_number:
 *         type: string
 *       email:
 *         type: string
 *       blocked:
 *         type: boolean
 *       role:
 *         $ref: '#/definitions/Role'  
 *       permissions:
 *         type: array
 *         items:
 *           type: string
 *       last_login:
 *         type: string
 *         format: date
 *       login_count:
 *         type: number
 *   ManipulationObject:
 *     properties:
 *       n:
 *         type: number
 *       nModified:
 *         type: number
 *       ok:
 *         type: number
 *   ResponseObjectSingle:
 *     properties:
 *       responseCode:
 *         type: number
 *       responseText:
 *         type: string
 *       payload:
 *         $ref: '#/definitions/UserObject'
 *   ResponseManipulation:
 *     properties:
 *       responseCode:
 *         type: number
 *       responseText:
 *         type: string
 *       payload:
 *         $ref: '#/definitions/ManipulationObject'
 *   ResponseObject:
 *     properties:
 *       responseCode:
 *         type: number
 *       responseText:
 *         type: string
 *       payload:
 *         type: object
 *         properties:
 *         total:
 *           type: number
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/definitions/UserObject'
 *   ResponseObjectRole:
 *     properties:
 *       responseCode:
 *         type: number
 *       responseText:
 *         type: string
 *       payload:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Role'
 *   ErrorObject:
 *     properties:
 *       responseCode:
 *         type: number
 *       responseText:
 *         type: string
 *       payload:
 *         type: string
 *   Token:
 *     properties:
 *       token:
 *         type: string
 */
/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     description: Returns all users data
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: to set the item's page number
 *         in: query
 *         type: number
 *       - name: limit
 *         description: to set the number of items needed per page
 *         in: query
 *         type: number
 *     responses:
 *       200:
 *         description: Authenticated user data
 *         schema:
 *           $ref: '#/definitions/ResponseObjectSingle'
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - SingleUser
 *     description: Returns a single user object
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User details successfully retrieved
 *         schema:
 *           $ref: '#/definitions/ResponseObjectSingle' 
 *       400:
 *         description: You supplied and invalid user field
 */
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - SingleUser
 *     description: Delete a single user object
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         schema:
 *           $ref: '#/definitions/ResponseManipulation' 
 *       400:
 *         description: You supplied and invalid user id
 */
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *       - SingleUser
 *     description: update User's details
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Updated User's details
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/UserModel'
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully updated User's details
 *         schema:
 *           $ref: '#/definitions/ResponseManipulation'
 */
/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: Registers a new user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user signup credentials
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserModel'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: You supplied and invalid user field
 *         schema:
 *           $ref: '#/definitions/ErrorObject'
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Log a user in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login
 *         description: User login credentials
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LoginModel'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#definitions/Token'
 */
/**
 * @swagger
 * /user/roles:
 *   get:
 *     tags:
 *       - User
 *     description: Returns all roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All available roles
 *         schema:
 *           $ref: '#/definitions/ResponseObjectRole'
 */
