# Problem 1
# Exploring the Central Limit Theorem through Simulations

## Introduction

In statistics, the **Central Limit Theorem (CLT)** is one of the most significant results, with wide-ranging applications in data science, quality control, econometrics, psychology, and more. It states that the sampling distribution of the sample mean will approximate a normal distribution as the sample size becomes large, regardless of the shape of the population distribution, provided the samples are independent and identically distributed (i.i.d.).

This project presents a comprehensive and visual exploration of the CLT using both **interactive JavaScript-based simulation** and **static graphical comparisons**. By incorporating different population distributions—**uniform**, **exponential**, and **binomial**—we illustrate how the convergence behavior varies across different shapes and variances.

## Motivation

The CLT serves as the theoretical foundation for inferential statistics. Without assuming that data is normally distributed, we can still use normal distribution models for inference if the sample size is sufficiently large. This powerful concept allows analysts and scientists to apply statistical tests, confidence intervals, and predictive modeling even when the population is unknown or skewed.

Understanding this theorem visually through simulation enhances intuition and reveals how convergence depends on sample size and population characteristics.

## Objectives

* Simulate sampling from multiple types of population distributions.
* Illustrate the convergence of sample means to a normal distribution.
* Compare visual results across distributions and sample sizes.
* Offer both interactive exploration and fixed graphical evidence.
* Discuss convergence speed, variance effects, and theoretical expectations.
* Connect simulations to real-world applications and inferential reasoning.

## Distributions Considered

* **Uniform Distribution**: Flat shape with all outcomes equally likely.
* **Exponential Distribution**: Right-skewed, often used for time-between-events modeling.
* **Binomial Distribution**: Discrete distribution arising from repeated binary trials.

---

## Methodology

### Step 1: Population Generation

We generate a large population of 10,000 values for each distribution:

* **Uniform**: `Math.random() * 10`
* **Exponential**: `-λ * log(1 - U)` with λ = 2
* **Binomial**: Sum of 10 Bernoulli trials with p = 0.5

### Step 2: Sampling and Mean Calculation

For each population:

* Draw 1000 random samples of sizes 5, 10, 30, and 50
* Calculate the mean of each sample
* Store the distribution of sample means

---

## Interactive Simulation (Live on GitHub Pages)

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CLT Interactive Simulation</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <h2>Central Limit Theorem: Interactive Simulation</h2>
  <label>Distribution:</label>
  <select id="distribution">
    <option value="uniform">Uniform</option>
    <option value="exponential">Exponential</option>
    <option value="binomial">Binomial</option>
  </select>

  <label>Sample Size:</label>
  <input id="sampleSize" type="number" value="30" min="1" max="100">

  <button onclick="simulateCLT()">Run Simulation</button>

  <div id="plot" style="width: 100%; height: 500px; margin-top: 20px;"></div>

  <script>
    function generatePopulation(type, size = 10000) {
      let data = [];
      if (type === "uniform") {
        for (let i = 0; i < size; i++) data.push(Math.random() * 10);
      } else if (type === "exponential") {
        for (let i = 0; i < size; i++) data.push(-2 * Math.log(1 - Math.random()));
      } else if (type === "binomial") {
        for (let i = 0; i < size; i++) {
          let x = 0;
          for (let j = 0; j < 10; j++) x += Math.random() < 0.5 ? 1 : 0;
          data.push(x);
        }
      }
      return data;
    }

    function simulateCLT() {
      let type = document.getElementById("distribution").value;
      let sampleSize = parseInt(document.getElementById("sampleSize").value);
      let population = generatePopulation(type);
      let sampleMeans = [];

      for (let i = 0; i < 1000; i++) {
        let sample = [];
        for (let j = 0; j < sampleSize; j++) {
          let index = Math.floor(Math.random() * population.length);
          sample.push(population[index]);
        }
        let mean = sample.reduce((a, b) => a + b, 0) / sample.length;
        sampleMeans.push(mean);
      }

      let trace = {
        x: sampleMeans,
        type: 'histogram',
        marker: { color: 'skyblue' }
      };
      let layout = {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Sample Means (n = ${sampleSize})`,
        xaxis: { title: "Sample Mean" },
        yaxis: { title: "Frequency" },
        bargap: 0.05
      };
      Plotly.newPlot("plot", [trace], layout);
    }
  </script>
</body>
</html>


## Static Visual Results

These plots show how sampling distributions change with increasing sample size for each population.

| Distribution    | Sample Size = 5                                   | Sample Size = 30                                   |   |   |   |   |   |   |   |   |   |
| --------------- | ------------------------------------------------- | -------------------------------------------------- | - | - | - | - | - | - | - | - | - |
| **Uniform**     | <img src="images/uniform_n5.png" width="250">     | <img src="images/uniform_n30.png" width="250">     |   |   |   |   |   |   |   |   |   |
| **Exponential** | <img src="images/exponential_n5.png" width="250"> | <img src="images/exponential_n30.png" width="250"> |   |   |   |   |   |   |   |   |   |
| **Binomial**    | <img src="images/binomial_n5.png" width="250">    | <img src="images/binomial_n30.png" width="250">    |   |   |   |   |   |   |   |   |   |



## Analysis and Insights

* **Uniform Distribution**: Converges quickly. At n=30, the histogram closely resembles a normal curve.
* **Exponential Distribution**: Starts highly skewed. Needs larger sample sizes to normalize, but still converges.
* **Binomial Distribution**: Already closer to normal at n=10 due to discrete symmetry. Converges rapidly.

### Variance Effect

Smaller variance results in tighter clustering of sample means. Larger variance causes more spread.


## Real-World Applications

| Domain          | CLT Usage                                 |
| --------------- | ----------------------------------------- |
| Medicine        | Drug efficacy trials, dosage estimation   |
| Manufacturing   | Quality control with defect rate sampling |
| Finance         | Predicting returns from portfolio samples |
| Psychology      | Behavioral study averaging                |
| Climate Science | Averaging over environmental sensors      |


## Theoretical Foundation

$$
\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \xrightarrow{d} N(\mu, \frac{\sigma^2}{n}) \text{ as } n \to \infty
$$

Where:

* $\mu$ is the population mean
* $\sigma^2$ is the population variance
* $\bar{X}_n$ is the sample mean of size $n$


## Conclusion

This project provides a comprehensive and visually rich demonstration of the Central Limit Theorem using both **interactive JavaScript** and **Python-generated plots**. Through side-by-side comparisons, theoretical derivations, and real-world applications, we show how and why the CLT holds regardless of population shape.

This blend of simulation and explanation builds deep intuition and prepares the reader to apply the CLT with confidence in practical statistical analysis.
