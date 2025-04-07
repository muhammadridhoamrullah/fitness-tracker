# Fitness Tracker API Documentation

## Models :

_User_
- username : string, unique (required)
- email : string, unique (required)
- password : string (required)
- age : integer (optional)
- gender : string (optional)
- height : number (optional, in cm)
- weight : number (optional, in kg)
- fitnessGoal : string (optional, enum: ['weight_loss', 'muscle_gain', 'endurance', 'maintain'])

_Workout_
- name : string (required)
- type : string (required, enum: ['cardio', 'strength', 'flexibility', 'mixed'])
- duration : number (required, in minutes)
- caloriesBurned : number (optional)
- difficulty : string (optional, enum: ['beginner', 'intermediate', 'advanced'])
- userId : integer (required)
- date : date (required)

_Nutrition_
- name : string (required)
- calories : number (required)
- protein : number (optional)
- carbs : number (optional)
- fat : number (optional)
- mealType : string (required, enum: ['breakfast', 'lunch', 'dinner', 'snack'])
- userId : integer (required)
- date : date (required)

_BodyMeasurement_
- userId : integer (required)
- weight : number (required, in kg)
- bodyFatPercentage : number (optional)
- muscleMass : number (optional)
- date : date (required)

## Relationship :

>### **One-to-Many Relationships**
- One User can have many Workouts
- One User can have many Nutrition Entries
- One User can have many Body Measurements

## Endpoints :

### Public Endpoints:
- `POST /register`
- `POST /login`

### Authentication Required Endpoints:
- `GET /workouts`
- `POST /workouts`
- `GET /nutrition`
- `POST /nutrition`
- `GET /measurements`
- `POST /measurements`
- `GET /users/profile`

### Authorization Required Endpoints:
> User can only access their own data
- `PUT /workouts/:id`
- `DELETE /workouts/:id`
- `PUT /nutrition/:id`
- `DELETE /nutrition/:id`
- `PUT /measurements/:id`
- `DELETE /measurements/:id`

## 1. POST /register

Request:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "age": "integer (optional)",
  "gender": "string (optional)",
  "height": "number (optional)",
  "weight": "number (optional)",
  "fitnessGoal": "string (optional)"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Username must be unique"
}
OR
{
  "message": "Invalid email format"
}
```

## 2. POST /login

Request:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "string",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "fitnessGoal": "string"
  }
}
```

## 3. GET /workouts

Description: Get user's workout history

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Query Parameters:
- `type`: Filter workouts by type
- `startDate`: Filter workouts from a specific date
- `endDate`: Filter workouts until a specific date

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "name": "Morning Run",
    "type": "cardio",
    "duration": 45,
    "caloriesBurned": 400,
    "difficulty": "intermediate",
    "date": "2024-02-15"
  },
  {
    "id": 2,
    "name": "Weight Training",
    "type": "strength",
    "duration": 60,
    "caloriesBurned": 300,
    "difficulty": "advanced",
    "date": "2024-02-16"
  }
]
```

## 4. POST /workouts

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body:
```json
{
  "name": "Evening Yoga",
  "type": "flexibility",
  "duration": 30,
  "caloriesBurned": 150,
  "difficulty": "beginner",
  "date": "2024-02-17"
}
```

_Response (201 - Created)_
```json
{
  "id": 3,
  "name": "Evening Yoga",
  "type": "flexibility",
  "duration": 30,
  "caloriesBurned": 150,
  "difficulty": "beginner",
  "date": "2024-02-17"
}
```

## 5. GET /nutrition

Description: Get user's nutrition log

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Query Parameters:
- `mealType`: Filter by meal type
- `date`: Filter by specific date
- `startDate`: Filter from a specific date
- `endDate`: Filter until a specific date

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "name": "Chicken Salad",
    "calories": 350,
    "protein": 30,
    "carbs": 15,
    "fat": 12,
    "mealType": "lunch",
    "date": "2024-02-15"
  },
  {
    "id": 2,
    "name": "Protein Shake",
    "calories": 200,
    "protein": 25,
    "carbs": 5,
    "fat": 3,
    "mealType": "snack",
    "date": "2024-02-15"
  }
]
```

## 6. POST /measurements

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body:
```json
{
  "weight": 75.5,
  "bodyFatPercentage": 18.5,
  "muscleMass": 40.2,
  "date": "2024-02-17"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "weight": 75.5,
  "bodyFatPercentage": 18.5,
  "muscleMass": 40.2,
  "date": "2024-02-17"
}
```

## Global Error Responses

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid or expired token"
}
```

_Response (403 - Forbidden)_
```json
{
  "message": "You are not authorized to perform this action"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
