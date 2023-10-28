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

const API_BASE_URL = 'http://localhost:3003/api';

export default function AdminPage() {
  const [selectedButton, setSelectedButton] = useState('all tasks');
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [myCompletedTasks, setMyCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    const mapTasks = (tasks) =>
      tasks.map((item, index) => ({
        ...item,
        id: index + 1,
        assignedUser: item.assignedUser.username,
        completedBy: item.completedBy ? item.completedBy.username : 'not yet',
        createdAt: formatDateTime(item.createdAt),
        deadline: formatDateTime(item.deadline),
      }));

    const fetchData = async () => {
      const { data: allTasksData } = await axios.get(`${API_BASE_URL}/tasks`);

      setAllTasks(mapTasks(allTasksData));
      setCompletedTasks(mapTasks(allTasksData.filter((task) => task.isDone)));
      setUncompletedTasks(
        mapTasks(allTasksData.filter((task) => !task.isDone))
      );

      const { data: userData } = await axios.get(
        `${API_BASE_URL}/users/name/${username}`
      );

      setAssignedTasks(mapTasks(userData.assignedTasks));
      setCreatedTasks(mapTasks(userData.createdTasks));
      setMyCompletedTasks(mapTasks(userData.completedTasks));
    };

    fetchData();
  }, [username]);

  return (
    <div>
      <AdminNavbar />
      <div style={{ height: '100%', width: '80%', margin: '0 auto' }}>
        <AdminButton setSelectedButton={setSelectedButton} />
        <DataGrid
          rows={
            {
              'all tasks': allTasks,
              'my completed tasks': myCompletedTasks,
              'completed tasks': completedTasks,
              'created tasks': createdTasks,
              'assigned tasks': assignedTasks,
              'uncompleted tasks': uncompletedTasks,
            }[selectedButton] || []
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
