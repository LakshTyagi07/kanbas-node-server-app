export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
      const { a, b, operation } = req.query;
  
      // Ensure a and b are parsed as integers
      const numA = parseInt(a);
      const numB = parseInt(b);
      let result = 0;
  
      switch (operation) {
        case "add":
          result = numA + numB;
          break;
        case "subtract":
          result = numA - numB;
          break;
        case "multiply":
          result = numA * numB;
          break;
        case "divide":
          if (numB === 0) {
            res.status(400).send("Division by zero is not allowed.");
            return;
          }
          result = numA / numB;
          break;
        default:
          result = "Invalid operation";
      }
  
      // Send the result as a string
      res.send(result.toString());
    });
  }