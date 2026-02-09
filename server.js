const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const permissionsRouter = require('./routes/permissions');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/permissions', permissionsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});