# Problem 1
##  Test Cases

### Example 1: Simple Series
- Circuit:  
  $$ A \xrightarrow{5\,\Omega} B \xrightarrow{10\,\Omega} C $$
- Expected Output:  
  $$ R_{AC} = 15\,\Omega $$



### Example 2: Parallel
- Circuit:  
  $$ A \xrightarrow{6\,\Omega} B,\quad A \xrightarrow{3\,\Omega} B $$
- Expected Output:  
  $$ R_{AB} = \left( \frac{1}{6} + \frac{1}{3} \right)^{-1} = 2\,\Omega $$

### Example 3: Nested (Parallel + Series)
- Circuit:  
  $$ A \xrightarrow{2\,\Omega} B \xrightarrow{6\,\Omega} C,\quad A \xrightarrow{3\,\Omega} C $$
- Description:  
  A–B–C path is in series, A–C path is in parallel with it.
- Expected Output:  
  $$ R_{AC} = \left( \frac{1}{2 + 6} + \frac{1}{3} \right)^{-1} = 1.5\,\Omega $$
