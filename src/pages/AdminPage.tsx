import { Box, IconButton, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddUrlDialog from '../components/AddUrlDialog';
import Container from '@mui/material/Container';
import DeleteUrlDialog from '../components/DeleteUrlDialog';

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

  const handleEditUrl = (url: Url) => {
    console.log("edit url " + url.id);
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
    const today = new Date();
    console.log(today.toISOString()); // Returns 2011-10-05T14:48:00.000Z
    console.log(id);
    console.log(url);
    console.log(ttl);
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
    console.log(items);
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
                  <Tooltip title="Edit">
                    <IconButton color="primary" aria-label="edit url" component="label" onClick={() => handleEditUrl(elem)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
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