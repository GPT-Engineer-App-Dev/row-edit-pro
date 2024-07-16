import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const CSVManager = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => line.split(','));
        setHeaders(headers);
        setCsvData(data);
        toast.success("CSV file uploaded successfully");
      };
      reader.readAsText(file);
    }
  };

  const handleEditCell = (rowIndex, columnIndex, value) => {
    const newData = [...csvData];
    newData[rowIndex][columnIndex] = value;
    setCsvData(newData);
  };

  const handleAddRow = () => {
    const newRow = new Array(headers.length).fill('');
    setCsvData([...csvData, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = csvData.filter((_, index) => index !== rowIndex);
    setCsvData(newData);
  };

  const handleDownload = () => {
    const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'edited_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Manager</h1>
      <Input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
      {csvData.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <Input
                          value={cell}
                          onChange={(e) => handleEditCell(rowIndex, columnIndex, e.target.value)}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button variant="destructive" onClick={() => handleDeleteRow(rowIndex)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 space-x-2">
            <Button onClick={handleAddRow}>Add Row</Button>
            <Button onClick={handleDownload}>Download CSV</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CSVManager;