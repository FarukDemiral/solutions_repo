# Problem 1
# Exploring the Central Limit Theorem through Simulations

## Introduction

In statistics, the Central Limit Theorem (CLT) is one of the most significant results, with wide-ranging applications in data science, quality control, econometrics, psychology, and more. It states that the sampling distribution of the sample mean will approximate a normal distribution as the sample size becomes large, regardless of the shape of the population distribution, provided the samples are independent and identically distributed (i.i.d.).

This project presents a comprehensive and visual exploration of the CLT using both interactive JavaScript-based simulation and static graphical comparisons. By incorporating different population distributions—uniform, exponential, and binomial—we illustrate how the convergence behavior varies across different shapes and variances.

standinUnderg this theorem visually through simulation enhances intuition and reveals how convergence depends on sample size and population characteristics.

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

### Step 1: Population Generation

We generate a large population of 10,000 values for each distribution:

- **Uniform Distribution**: Values are sampled using the formula \\( x = \\text{random()} \\times 10 \\), generating a flat, bounded distribution between 0 and 10.
- **Exponential Distribution**: Values are derived from the inverse transform method: \\( x = -2 \\times \\ln(1 - U) \\), where \\( U \\sim \\text{Uniform}(0,1) \\).
- **Binomial Distribution**: Each value is the sum of 10 independent Bernoulli trials with success probability \\( p = 0.5 \\), simulating outcomes from a discrete binary process.


### Step 2: Sampling and Mean Calculation

For each population:

* Draw 1000 random samples of sizes 5, 10, 30, and 50
* Calculate the mean of each sample
* Store the distribution of sample means

---

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


---

## Static Visual Exploration

The following static visualizations illustrate how the original population distributions compare with their respective sampling distributions. This progression offers compelling visual support for the Central Limit Theorem's assertion about convergence to normality.

To reinforce the findings from the interactive simulation above, the following static plots provide a clear visual representation of the CLT in action. Each image shows how the distribution of sample means becomes more bell-shaped as the sample size increases.

### Visual Comparison: Original Population vs Sample Mean Distribution

<div style="display: flex; flex-wrap: wrap; gap: 30px;">
  <div>
    <h4>Original Uniform Population</h4>
    <div id="uniformPop" style="width:300px;height:250px;"></div>
  </div>
  <div>
    <h4>Sample Means (n=30)</h4>
    <div id="uniformSampleMeans" style="width:300px;height:250px;"></div>
  </div>
</div>

<script>
  function drawVisuals(distribution) {
    const pop = [];
    const sampleMeans = [];
    for (let i = 0; i < 10000; i++) {
      pop.push(Math.random() * 10);
    }
    for (let i = 0; i < 1000; i++) {
      let s = [];
      for (let j = 0; j < 30; j++) {
        s.push(pop[Math.floor(Math.random() * pop.length)]);
      }
      sampleMeans.push(s.reduce((a,b) => a + b, 0) / s.length);
    }
    Plotly.newPlot("uniformPop", [{x: pop, type: 'histogram', marker:{color: 'gray'}}], {title: 'Population Distribution'});
    Plotly.newPlot("uniformSampleMeans", [{x: sampleMeans, type: 'histogram', marker:{color: 'steelblue'}}], {title: 'Sampling Distribution'});
  }
  drawVisuals();
</script>


> The two charts above visually contrast the shape of the population with the emerging normality of the sampling distribution. This dual-view visualization helps students better understand the convergence guaranteed by the Central Limit Theorem.

---

## Analysis and Insights

* **Uniform Distribution**: Converges quickly. At n=30, the histogram closely resembles a normal curve.
* **Exponential Distribution**: Starts highly skewed. Needs larger sample sizes to normalize, but still converges.
* **Binomial Distribution**: Already closer to normal at n=10 due to discrete symmetry. Converges rapidly.

### Variance Effect

Smaller variance results in tighter clustering of sample means. Larger variance causes more spread.

---

## Real-World Applications

| Domain          | CLT Usage                                 |
| --------------- | ----------------------------------------- |
| Medicine        | Drug efficacy trials, dosage estimation   |
| Manufacturing   | Quality control with defect rate sampling |
| Finance         | Predicting returns from portfolio samples |
| Psychology      | Behavioral study averaging                |
| Climate Science | Averaging over environmental sensors      |

---

## Theoretical Foundation

$$
\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \xrightarrow{d} N(\mu, \frac{\sigma^2}{n}) \text{ as } n \to \infty
$$

**Where:**

* $\mu$ is the population mean
* $\sigma^2$ is the population variance
* $\bar{X}_n$ is the sample mean of size $n$

---

## Conclusion

This project provides a comprehensive and visually rich demonstration of the Central Limit Theorem using both interactive JavaScript and Python-generated plots. Through side-by-side comparisons, theoretical derivations, and real-world applications, we show how and why the CLT holds regardless of population shape.

This blend of simulation and explanation builds deep intuition and prepares the reader to apply the CLT with confidence in practical statistical analysis.
