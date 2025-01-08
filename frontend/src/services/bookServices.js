import axios from "axios";

export const getAll = async () => {
  const{data} =await axios.get('/api/books');
  return Array.isArray(data) ? data : []; 
  
};

export const search = async searchTerm =>
    {
      const{data} =await axios.get(`/api/books/search/${searchTerm}`);
      console.log('Books response from search:', data);
      return Array.isArray(data) ? data : []; 
      
    }

export const getById = async bookId =>
    {
      const {data} =await axios.get('/api/books/'+bookId);
      return data;
    }
export async function deleteById(foodId) {
      await axios.delete('/api/foods/' + foodId);
    }
    
export async function update(food) {
      await axios.put('/api/foods', food);
    }
    
export async function add(food) {
      const { data } = await axios.post('/api/foods', food);
      return data;
    }