import { useState } from 'react';

// material-ui
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ==============================|| ACCOUNT USER PAGE ||============================== //

const initialRows = [
    { id: 1, username: 'johndoe', email: 'john@example.com', password: 'password123' },
    { id: 2, username: 'janesmith', email: 'jane@example.com', password: 'secretpass' },
    { id: 3, username: 'bobj', email: 'bob@example.com', password: 'bobspassword' },
];

export default function AccountUser() {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditId(null);
        setFormData({ username: '', email: '', password: '' });
    };

    const handleSave = () => {
        if (editId) {
            setRows(rows.map(row => (row.id === editId ? { ...formData, id: editId } : row)));
        } else {
            setRows([...rows, { ...formData, id: rows.length + 1 }]);
        }
        handleClose();
    };

    const handleEdit = (row) => {
        setEditId(row.id);
        setFormData(row);
        setOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const togglePasswordVisibility = (id) => {
        setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <MainCard title="Akun User">
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleOpen}>
                    Add User
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography>
                                            {showPassword[row.id] ? row.password : '••••••••'}
                                        </Typography>
                                        <IconButton size="small" onClick={() => togglePasswordVisibility(row.id)}>
                                            {showPassword[row.id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                <EditOutlined />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => handleDelete(row.id)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
                        <TextField
                            label="Username"
                            fullWidth
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <TextField
                            label="Password"
                            fullWidth
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            type="text" // Using text to make it easy to see what is being typed for admin
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}
