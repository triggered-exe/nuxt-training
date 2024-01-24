
import fs from 'fs'

const filePath = '/file.json';




export default defineEventHandler((event) => {

    // readFileOrCreate()
    function readFileOrCreate() {
        try {
          // Read the file synchronously
          const content = fs.readFileSync(filePath, 'utf-8');
          console.log('File content:', content);
      
          // Append current timestamp to the existing content
          const currentTime = new Date().toLocaleString();
          const updatedContent = `${content}\nUpdated at: ${currentTime}`;
          
          // Write the updated content back to the file
          fs.writeFileSync(filePath, updatedContent, 'utf-8');
          console.log('File updated with timestamp.');
        } catch (error) {
          // File doesn't exist, create it with current timestamp
          console.log('File not found. Creating...');
          const currentTime = new Date().toLocaleString();
          const fileContent = `Hello, World! Created at: ${currentTime}`;
          fs.writeFileSync(filePath, fileContent, 'utf-8');
          console.log('File created with timestamp.');
        }
      }

      readFileOrCreate();
      console.log(fs.readFileSync(filePath, 'utf-8'))
    return {
        message: 'Hello World',
        date: new Date().toISOString(),
        randomNumber: Math.random(),
        // file: fs.readFileSync(filePath, 'utf-8')
    }
})