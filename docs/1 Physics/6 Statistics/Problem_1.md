# Problem 1
# Exploring the Central Limit Theorem through Simulations

## Motivation

The Central Limit Theorem (CLT) is a foundational concept in probability and statistics. It asserts that, regardless of the original population's distribution, the sampling distribution of the sample mean tends toward a normal distribution as the sample size increases. This project provides a practical and visual exploration of this principle through simulation.

## Objectives

1. Simulate sampling distributions using various population types.
2. Visualize the convergence toward normality.
3. Analyze the effects of sample size and population shape.
4. Discuss practical implications of the Central Limit Theorem.

## Distributions Considered

* Uniform distribution
* Exponential distribution
* Binomial distribution

## Methodology

### Population Generation

For each distribution, generate a synthetic population of size 10,000 using appropriate NumPy random generators:

* `np.random.uniform(0, 10, 10000)`
* `np.random.exponential(scale=2, size=10000)`
* `np.random.binomial(n=10, p=0.5, size=10000)`

### Sampling and Visualization

For each distribution:

1. Draw 1,000 random samples of sizes 5, 10, 30, and 50.
2. Calculate the sample mean for each.
3. Plot histograms of these sample means using Matplotlib and Seaborn.

### Simulation Code

<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <h2>Central Limit Theorem Simulation</h2>
  <label for="distribution">Distribution:</label>
  <select id="distribution">
    <option value="uniform">Uniform</option>
    <option value="exponential">Exponential</option>
    <option value="binomial">Binomial</option>
  </select>
  <label for="sampleSize">Sample Size:</label>
  <input type="number" id="sampleSize" value="30">
  <button onclick="simulateCLT()">Simulate</button>

  <div id="plot" style="width:100%;max-width:700px;height:500px;"></div>

  <script>
    function generatePopulation(type, size = 10000) {
      const data = [];
      if (type === "uniform") {
        for (let i = 0; i < size; i++) data.push(Math.random() * 10);
      } else if (type === "exponential") {
        for (let i = 0; i < size; i++) data.push(-2 * Math.log(1 - Math.random()));
      } else if (type === "binomial") {
        for (let i = 0; i < size; i++) {
          let sum = 0;
          for (let j = 0; j < 10; j++) {
            sum += Math.random() < 0.5 ? 1 : 0;
          }
          data.push(sum);
        }
      }
      return data;
    }

    function simulateCLT() {
      const dist = document.getElementById("distribution").value;
      const sampleSize = parseInt(document.getElementById("sampleSize").value);
      const population = generatePopulation(dist);
      const sampleMeans = [];

      for (let i = 0; i < 1000; i++) {
        const sample = [];
        for (let j = 0; j < sampleSize; j++) {
          const idx = Math.floor(Math.random() * population.length);
          sample.push(population[idx]);
        }
        const mean = sample.reduce((a, b) => a + b, 0) / sample.length;
        sampleMeans.push(mean);
      }

      const trace = {
        x: sampleMeans,
        type: 'histogram',
        marker: { color: 'skyblue' },
      };

      const layout = {
        title: `${dist.charAt(0).toUpperCase() + dist.slice(1)} Distribution - Sample Means (n=${sampleSize})`,
        xaxis: { title: 'Sample Mean' },
        yaxis: { title: 'Frequency' }
      };

      Plotly.newPlot('plot', [trace], layout);
    }
  </script>
</body>
</html>

## Results and Analysis

The histograms generated reveal that as sample size increases:

* The sampling distribution becomes more symmetric and bell-shaped.
* The effect is visible across all distributions, even highly skewed ones like the exponential distribution.
* Larger sample sizes lead to more concentrated means, indicating reduced variance.

## Theoretical Justification

Let $X_1, X_2, \ldots, X_n$ be independent and identically distributed random variables with mean $\mu$ and variance $\sigma^2$. The Central Limit Theorem states:

$$
\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \Rightarrow N(\mu, \frac{\sigma^2}{n}) \quad \text{as } n \to \infty
$$

## Practical Applications

1. **Estimation**: Approximate population means using sample means.
2. **Manufacturing**: Monitor quality control through sample-based inspection.
3. **Finance**: Model average returns and associated risks over time.

## Conclusion

This project confirms that the sampling distribution of the mean becomes increasingly normal with larger sample sizes, irrespective of the population's original shape. The Central Limit Theorem underpins much of inferential statistics, offering a bridge between raw data and probabilistic inference.
