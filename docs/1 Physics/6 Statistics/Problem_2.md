# Problem 2
# Exploring the Central Limit Theorem through Simulations

## Introduction

In the field of statistics, the Central Limit Theorem (CLT) is one of the most powerful and widely used theoretical results. It explains why the normal distribution arises so frequently in practice and forms the theoretical basis for many statistical procedures. The CLT states that when independent random samples are drawn from a population, the distribution of the sample means approaches a normal distribution as the sample size increases, regardless of the population’s original distribution.

This project explores the Central Limit Theorem through computational simulations. By generating synthetic populations and sampling from them repeatedly, we observe the transformation of sampling distributions into a bell-shaped curve, demonstrating the CLT in action. The interactive JavaScript-based simulation further enhances understanding by enabling users to dynamically explore how sample size and distribution type affect convergence to normality.

## Motivation

The Central Limit Theorem is a fundamental principle in probability theory and statistics. It states that, irrespective of the shape of the original population distribution, the sampling distribution of the sample mean approximates a normal distribution as the sample size increases. This phenomenon is central to many statistical procedures, including hypothesis testing and confidence interval estimation. The objective of this project is to provide a clear, interactive, and visually-supported demonstration of the CLT using simulations.

## Objectives

1. Construct sampling distributions using different population types.
2. Demonstrate convergence to normality as sample size increases.
3. Explore how distribution shape and variance affect sampling behavior.
4. Connect the CLT to practical applications across real-world domains.

## Distributions Considered

* **Uniform distribution**: equal probability over a fixed interval.
* **Exponential distribution**: skewed distribution with memoryless property.
* **Binomial distribution**: discrete distribution modeling binary outcomes.

## Methodology

### Population Generation

To simulate realistic sampling behavior, we generate synthetic populations of size 10,000 for each distribution type:

* **Uniform**: values randomly selected from the interval \[0, 10].
* **Exponential**: values generated with a mean of 2 using inverse transform sampling.
* **Binomial**: outcomes based on 10 independent Bernoulli trials with success probability 0.5.

### Sampling and Visualization

For each distribution:

1. Draw 1,000 random samples with varying sample sizes: 5, 10, 30, and 50.
2. Compute the sample mean for each iteration.
3. Use JavaScript and Plotly.js to dynamically plot histograms of sample means.

### Interactive Simulation 

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Central Limit Theorem Simulator</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <h2>Central Limit Theorem Interactive Simulation</h2>

  <label for="distribution">Choose a Distribution:</label>
  <select id="distribution">
    <option value="uniform">Uniform</option>
    <option value="exponential">Exponential</option>
    <option value="binomial">Binomial</option>
  </select>

  <label for="sampleSize">Sample Size:</label>
  <input type="number" id="sampleSize" value="30" min="1" max="100">

  <button onclick="simulateCLT()">Simulate</button>

  <div id="plot" style="width:100%;max-width:800px;height:500px;margin-top:20px;"></div>

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
        marker: { color: 'steelblue' },
      };

      const layout = {
        title: `${dist.charAt(0).toUpperCase() + dist.slice(1)} Distribution – Sample Means (n=${sampleSize})`,
        xaxis: { title: 'Sample Mean' },
        yaxis: { title: 'Frequency' },
        bargap: 0.05
      };

      Plotly.newPlot('plot', [trace], layout);
    }
  </script>
</body>
</html>

## Results and Analysis

The simulation confirms that:

* Sampling distributions approximate a normal shape as the sample size increases.
* This behavior holds even when the original population is skewed or discrete.
* The variance of the sampling distribution decreases with increasing sample size.

## Theoretical Justification

Let $X_1, X_2, \ldots, X_n$ be i.i.d. random variables with mean $\mu$ and variance $\sigma^2$. The Central Limit Theorem states:

$$
\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \xrightarrow{d} N(\mu, \frac{\sigma^2}{n}) \quad \text{as } n \to \infty
$$

This convergence to normality forms the theoretical foundation for many inferential methods.

## Practical Applications

1. **Estimation of Population Parameters**: Enables inference from samples to populations.
2. **Manufacturing and Quality Control**: Supports defect monitoring through sampling.
3. **Finance and Economics**: Justifies modeling average returns and risk forecasts.

## Conclusion

This project provides a hands-on demonstration of the Central Limit Theorem using an interactive, browser-based simulation. It reinforces the theoretical insights by visualizing the normality of sample means across varying distributions and sample sizes. The CLT remains a cornerstone of modern statistics, essential for reliable data-driven decision making.
