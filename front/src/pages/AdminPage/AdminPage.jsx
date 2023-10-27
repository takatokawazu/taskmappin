import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AdminNavbar from './AdminNavbar';
import AdminButton from './AdminButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatDateTime } from '../../utils/time';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'desc', headerName: 'Description', width: 200 },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
  { field: 'createdBy', headerName: 'Created By', width: 150 },
  { field: 'deadline', headerName: 'Deadline', width: 200 },
  { field: 'assignedUser', headerName: 'Assigned User', width: 220 },
  { field: 'completedBy', headerName: 'Completed By', width: 220 },
  { field: 'isDone', headerName: 'Is Done', width: 100 },
];

export default function AdminPage() {
  const [selectedButton, setSelectedButton] = React.useState('all tasks');
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [myCompletedTasks, setMyCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await axios.get('http://localhost:3003/api/tasks');
      const allT = res1.data;
      setAllTasks(
        allT.map((item, index) => {
          console.log(item);
          return {
            ...item,
            id: index + 1,
            assignedUser: item.assignedUser.username,
            completedBy: item.completedBy
              ? item.completedBy.username
              : 'not yet',
            createdAt: formatDateTime(item.createdAt),
            deadline: formatDateTime(item.deadline),
          };
        })
      );

      setCompletedTasks(
        allT
          .filter((task) => task.isDone)
          .map((item, index) => {
            return {
              ...item,
              id: index + 1,
              assignedUser: item.assignedUser.username,
              completedBy: item.completedBy
                ? item.completedBy.username
                : 'not yet',
              createdAt: formatDateTime(item.createdAt),
              deadline: formatDateTime(item.deadline),
            };
          })
      );

      setUncompletedTasks(
        allT
          .filter((task) => !task.isDone)
          .map((item, index) => {
            return {
              ...item,
              id: index + 1,
              assignedUser: item.assignedUser.username,
              completedBy: item.completedBy
                ? item.completedBy.username
                : 'not yet',
              createdAt: formatDateTime(item.createdAt),
              deadline: formatDateTime(item.deadline),
            };
          })
      );

      const res = await axios.get(
        `http://localhost:3003/api/users/name/${username}`
      );

      const assignedT = res.data.assignedTasks;
      console.log(assignedT);
      setAssignedTasks(
        assignedT.map((item, index) => {
          return {
            ...item,
            id: index + 1,
            assignedUser: item.assignedUser.username,
            createdAt: formatDateTime(item.createdAt),
            deadline: formatDateTime(item.deadline),
          };
        })
      );

      const createdT = res.data.createdTasks;
      setCreatedTasks(
        createdT.map((item, index) => {
          return {
            ...item,
            id: index + 1,
            assignedUser: item.assignedUser.username,
            createdAt: formatDateTime(item.createdAt),
            deadline: formatDateTime(item.deadline),
          };
        })
      );

      const completedT = res.data.completedTasks;
      setMyCompletedTasks(
        completedT.map((item, index) => {
          return {
            ...item,
            id: index + 1,
            assignedUser: item.assignedUser.username,
            createdAt: formatDateTime(item.createdAt),
            deadline: formatDateTime(item.deadline),
          };
        })
      );
    };
    fetchData();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div style={{ height: '100%', width: '80%', margin: '0 auto' }}>
        <AdminButton setSelectedButton={setSelectedButton} />
        <DataGrid
          rows={
            selectedButton === 'all tasks'
              ? allTasks
              : selectedButton === 'my completed tasks'
              ? myCompletedTasks
              : selectedButton === 'completed tasks'
              ? completedTasks
              : selectedButton === 'created tasks'
              ? createdTasks
              : selectedButton === 'assigned tasks'
              ? assignedTasks
              : uncompletedTasks
          }
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
