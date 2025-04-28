# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorentz Force Simulation</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css"/>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 100vh;
            box-sizing: border-box;
            overflow-x: hidden;
        }
        h1 {
            color: #333;
            margin-top: 20px;
        }
        #simulationCanvas {
            background-color: #e0e0e0;
            border: 1px solid #ccc;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            width: 95%;
            max-width: 800px;
            height: auto;
            aspect-ratio: 8 / 6;
        }
        #message-box {
            background-color: #fff;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            color: #333;
            width: 95%;
            max-width: 800px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <h1>Lorentz Force Simulation</h1>
    <canvas id="simulationCanvas"></canvas>
    <div id="message-box">Loading simulation data...</div>
    <script>
        const canvas = document.getElementById('simulationCanvas');
        const ctx = canvas.getContext('2d');
        const messageBox = document.getElementById('message-box');

        function plotTrajectory(r, ctx, xlabel, ylabel, zlabel, title) {  // Added labels and title
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            const dimensions = { xOffset: canvas.width / 2, yOffset: canvas.height / 2 };
             if (r && r.length > 0 && r[0].length === 3) {
                ctx.moveTo(r[0][0] + dimensions.xOffset, r[0][1] + dimensions.yOffset);
                for (let i = 1; i < r.length; i++) {
                    ctx.lineTo(r[i][0] + dimensions.xOffset, r[i][1] + dimensions.yOffset);
                }
                ctx.strokeStyle = '#007BFF';
                ctx.lineWidth = 2;
                ctx.stroke();
            } else if (r && r.length>0 && r[0].length === 2){
                 ctx.moveTo(r[0][0], r[0][1]);
                for (let i = 1; i < r.length; i++) {
                    ctx.lineTo(r[i][0], r[i][1]);
                }
                ctx.strokeStyle = '#007BFF';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            else {
                messageBox.textContent = "No trajectory data available.";
                return;
            }

            // Add labels and title
            ctx.font = "14px Arial";  // Set font for labels
            ctx.fillStyle = "#000";    // Set color to black

            // X label
            ctx.fillText(xlabel, canvas.width / 2 - 50, canvas.height - 10);  // Position at the bottom

            // Y label
            ctx.save(); // Save the current context state
            ctx.translate(10, canvas.height / 2);
            ctx.rotate(-Math.PI / 2);  // Rotate the context
            ctx.fillText(ylabel, 0, 0);
            ctx.restore(); // Restore original context state

             if (r && r.length > 0 && r[0].length === 3) {
                // Z label
                ctx.save();
                ctx.translate(canvas.width - 20, canvas.height / 2);
                ctx.fillText(zlabel, 0, 0);
                ctx.restore();
             }

            // Title
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(title, canvas.width / 2, 20);
        }

        // Load the JSON data
        fetch('trajectory_data.json')
            .then(response => response.json())
            .then(data => {
                const trajectoryData = data.trajectory_B;
                const xlabel = data.xlabel;
                const ylabel = data.ylabel;
                const zlabel = data.zlabel;
                const title = data.title;
                plotTrajectory(trajectoryData, ctx, xlabel, ylabel, zlabel, title);  // Pass labels and title
                messageBox.textContent = 'Simulation complete.'; // Update message
            })
            .catch(error => {
                console.error('Error loading data:', error);
                messageBox.textContent = 'Error loading simulation data.'; // Update message
            });
    </script>
</body>
</html>
