# Problem 1
# 📊 Exploring the Central Limit Theorem through Simulations

## 🎯 Motivation

The **Central Limit Theorem (CLT)** is a cornerstone of probability and statistics. It states that as the sample size increases, the sampling distribution of the sample mean approaches a **normal distribution**, regardless of the population's original distribution.

This project provides an intuitive, hands-on way to observe this phenomenon through simulations.

---

## 🧪 Task Overview

### 1. Simulating Sampling Distributions

We use the following population distributions:
- Uniform distribution
- Exponential distribution
- Binomial distribution

### 2. Sampling and Visualization

For each distribution:
- Generate a population dataset
- Sample data with different sample sizes (e.g., 5, 10, 30, 50)
- Compute the mean of each sample
- Repeat 1000 times to build the sampling distribution
- Plot histograms of sample means

### 3. Parameter Exploration

- Observe how the sample size and distribution shape affect the convergence to normality.
- Discuss variance effects on spread.

### 4. Practical Applications

- Estimating population parameters
- Quality control in manufacturing
- Predicting outcomes in financial models

---

## 🧠 Central Limit Theorem (CLT) Intuition

> As sample size \( n \to \infty \), the distribution of the sample mean  
> \( \bar{X} = \frac{1}{n}\sum_{i=1}^{n}X_i \) approaches a normal distribution,  
> even if the underlying \( X_i \) are not normally distributed.

---

## 💻 Python Simulation Code

```python
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set Seaborn style for better visuals
sns.set(style="whitegrid")

# Output directory
output_dir = "clt_plots"
os.makedirs(output_dir, exist_ok=True)

def simulate_clt(population, dist_name, sample_sizes=[5, 10, 30, 50], num_samples=1000):
    """
    Simulate sample means and plot their distribution for various sample sizes.
    """
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

# Set seed
np.random.seed(42)

# Create populations
pop_uniform = np.random.uniform(0, 10, 10000)
pop_exponential = np.random.exponential(scale=2, size=10000)
pop_binomial = np.random.binomial(n=10, p=0.5, size=10000)

# Run simulations
simulate_clt(pop_uniform, "Uniform")
simulate_clt(pop_exponential, "Exponential")
simulate_clt(pop_binomial, "Binomial")
