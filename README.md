# SER531-Team11

Team Members

1. Harshitha Maripally
2. Naga Vardhini Garugu
3. Gautham Lakkavajhala
4. Akhil Prathist Nadagani


**Steps to run the project:**
By performing the actions listed below, we launched an EC2 instance on AWS for a free, publicly accessible SPARQL endpoint:
• If you do not already have an AWS account, create one. Then log in, and on the EC2 page of the AWS Console, choose ”Launch Instance” from the orange ”Launch Instance” button’s dropdown menu.
• Specify Fuseki server as the instance’s name.
• Select an Amazon Machine Image.
• Select an Instance type.
• Create or select a Key Pair, which consists of a set of public and private keys that will permit access to new instance from a local machine. Download the .pem file if you’re creating a new pair.
• Provide the Network settings by checking both HTTPS and HTTP traffic from the internet.
• Choose the storage required.
• Click on the Launch instance button.
• By default, Fuseki uses port 3030, thus you can add a rule for it by selecting ”Edit Inbound Rules” under ”Inbound Rules” on the Security tab after clicking the sg-long-hex-number security group name under ”Security groups.”
• Click ”Add rule” to add a new rule with the ”Port range” of 3030. To set the sixth column to 0.0.0.0/0 like the others, choose ”Anywhere-IPv4” from the options in the
fifth column. Keep the Type value set to ”Custom TCP” and click ”Save rules” at the bottom of the page.


Plugin:

We used cellfie plugin to generate RDF files using the data collected using SeatGeek API.
Youtube - 
Google Drive - 
