import pandas as pd

# Load the Excel file into a DataFrame

excel_file_path = 'path/to/your/excel/file.xlsx'
df = pd.read_excel(excel_file_path)

# Convert DataFrame to CSV and save it
csv_file_path = 'path/to/your/output/file.csv'
df.to_csv(csv_file_path, index=False)

print(f"Conversion successful. CSV file saved at: {csv_file_path}")
