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

### Python Simulation Code

```python
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

sns.set(style="whitegrid")
output_dir = "clt_plots"
os.makedirs(output_dir, exist_ok=True)

def simulate_clt(population, dist_name, sample_sizes=[5, 10, 30, 50], num_samples=1000):
    for n in sample_sizes:
        sample_means = [
            np.mean(np.random.choice(population, size=n, replace=True))
            for _ in range(num_samples)
        ]
        plt.figure(figsize=(8, 5))
        sns.histplot(sample_means, bins=30, kde=True, color="skyblue")
        plt.title(f"{dist_name} Distribution - Sample Means (n={n})")
        plt.xlabel("Sample Mean")
        plt.ylabel("Frequency")
        plt.tight_layout()
        filename = f"{dist_name.lower()}_n{n}.png"
        plt.savefig(os.path.join(output_dir, filename))
        plt.close()
        print(f"Saved: {filename}")

np.random.seed(42)

pop_uniform = np.random.uniform(0, 10, 10000)
pop_exponential = np.random.exponential(scale=2, size=10000)
pop_binomial = np.random.binomial(n=10, p=0.5, size=10000)

simulate_clt(pop_uniform, "Uniform")
simulate_clt(pop_exponential, "Exponential")
simulate_clt(pop_binomial, "Binomial")
```

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
