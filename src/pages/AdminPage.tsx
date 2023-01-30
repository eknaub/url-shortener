import { Box, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AddUrlDialog from '../components/AddUrlDialog';
import Container from '@mui/material/Container';
import DeleteUrlDialog from '../components/DeleteUrlDialog';
import EditUrlDialog from '../components/EditUrlDialog';

interface Url {
  id: string;
  url: string;
  ttlInSeconds: number;
  createdDate: string;
  modifiedDate: string;
}

export default function AdminPage() {

  React.useEffect(() => {
    fetchItems();
  }, []);

  const [urls, setUrls] = React.useState<Url[]>([]);

  const handleEditUrl = (id: string, url: string, ttl: number) => {
    var jsonData = {
      "url": url,
      "ttlInSeconds": ttl
    }

    fetch(`https://urlshortener.smef.io/urls/${id}`, {
      method: 'PUT', 
      headers: { 
        'Content-Type': "application/json;",
        'Authorization': `Basic ${btoa('abat:5hWDEcFK4FUW')}`,
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => response.json())
      .then(data => {
        const newList = urls.map((item) => {
          if (item.id === data.id) {
            const updatedItem = {
              ...item,
              url: url,
              ttlInSeconds: ttl,
              modifiedDate: new Date().toISOString(),
            };
    
            return updatedItem;
          }
          return item;
        });
    
        setUrls(newList);
      })
      .catch(error => {
          console.log(error)
      }
    )
  };

  const handleDeleteUrl = async (id: string) => {
    await fetch(`https://urlshortener.smef.io/urls/${id}`, {
      method: 'DELETE', 
      headers: { 
        'Content-Type': "application/json;",
        'Authorization': `Basic ${btoa('abat:5hWDEcFK4FUW')}`,
      },
    });

    const newList = urls.filter((item) => item.id !== id);
    setUrls(newList);
  };

  const handleAddUrl = (id: string, url: string, ttl: number) => {
    var jsonData = {
      "url": url,
      "ttlInSeconds": ttl
    }

    fetch(`https://urlshortener.smef.io/urls/${id}`, {
      method: 'POST', 
      headers: { 
        'Content-Type': "application/json;",
        'Authorization': `Basic ${btoa('abat:5hWDEcFK4FUW')}`,
      },
      body: JSON.stringify(jsonData)
      })
      .then(response => response.json())
      .then(data => {
        setUrls([ ...urls, data ]);
      })
      .catch(error => {
          console.log(error)
      }
    )
  };

  const fetchItems = async () => {
    const data = await fetch('https://urlshortener.smef.io/urls', {
      method: 'GET', 
      headers: { 
        'Content-Type': "application/json;",
        'Authorization': `Basic ${btoa('abat:5hWDEcFK4FUW')}`,
      },
    });
    const items = await data.json();
    setUrls(items);
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Container>
                <AddUrlDialog handleClick={handleAddUrl}/>
              </Container>
            </TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">url</TableCell>
            <TableCell align="right">ttlInSeconds</TableCell>
            <TableCell align="right">createdDate</TableCell>
            <TableCell align="right">modifiedDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((elem) => (
            <StyledTableRow key={elem.id}>
              <TableCell component="th" scope="row">
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
                >
                  <EditUrlDialog pId={elem.id} pUrl={elem.url} pTtl={elem.ttlInSeconds} handleClick={handleEditUrl} />
                  <DeleteUrlDialog id={elem.id} handleClick={() => handleDeleteUrl(elem.id)} />
                </Box>
              </TableCell>
              <TableCell align="right">{elem.id}</TableCell>
              <TableCell align="right">{elem.url}</TableCell>
              <TableCell align="right">{elem.ttlInSeconds}</TableCell>
              <TableCell align="right">{elem.createdDate}</TableCell>
              <TableCell align="right">{elem.modifiedDate}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}