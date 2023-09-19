import axios from 'axios';

import { useQueries, useQuery } from 'react-query';
import { Link } from 'react-router-dom';


export type Repository = {
  full_name:string;
  description:string;
}

export function Repos() {


  //aqui vai fazer uma reavalidação, atutomaticamente quando atualizar alguma coisa.
  const { data, isFetching } = useQuery<Repository[]>('repos', async ()=>{
    const response = await axios.get('https://api.github.com/users/calebeer/repos')

    return response.data;
  },{
    //o staleTime serve basicamente para falar em quanto tempo os dados vão estar obsoletos
    staleTime:1000*60,//1 minuto
  })



  return (
    <ul>
      {isFetching && <p>carregando...</p>}
      {data?.map(repo => {
        return( 
          <li key={repo.full_name} >
            <Link to={`repos/${repo.full_name}`} >
                {repo.full_name}
            </Link>
            <p>{repo.description}</p> 
          </li>
        )
      })}
    </ul>
  )
  
}


  