# QuickFunctions

A module designed to take less time in rewriting functions basic functions for JavaScript!
It can be used across multiple JavaScript frameworks (since they all work the same, practically) and most libraries you're developing, whatever for!

Currently supports the following functions:

### **Timeout and Interval functions**
- `timeout()` - *written as `setCommandTimeout(function, time)`*
- `clearTimeout()` - *written as `clearCommandTimeout(function)`*
- `setInterval()` - *written as `setCommandInterval(function, time)`*
- `clearInterval()` - *written as `clearCommandInterval(function)`*
----------------------------------------------------------------------------
- `currentTime()` - *Obtain the current time*
----------------------------------------------------------------------------
### **Regular Expressions (RegEx/p) functions**
- `RegLettersAll(input)` - *Regular Expressions for all English Letters*
- `RegNumbersAll(input)` - *Regular Expressions for all numeric characters*
----------------------------------------------------------------------------
### **__Warning! MySQL Features are beta and may or may not work! Use at own will__**
- `alterTable(tblName, data)` - *Alters MySQL DataBase Table*
- `TableCreate(tblName, extras)` - *Creates a MySQL Table with optional `extras`*
- `CreateDB(dbName)` - *Creates a MySQL DataBase*
- `dbConnect(host, uName, pass)` - *Connects to a MySQL DataBase; Creates and deletes a database to test connection*

