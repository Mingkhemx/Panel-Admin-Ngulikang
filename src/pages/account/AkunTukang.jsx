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
    Typography,
    Tooltip,
    Rating
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';

// assets
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// ==============================|| AKUN TUKANG PAGE ||============================== //

const initialRows = [
    { id: 1, name: 'Budi Santoso', specialty: 'Plumber', rating: 4.5, status: 'Active' },
    { id: 2, name: 'Agus Setiawan', specialty: 'Electrician', rating: 5, status: 'Active' },
    { id: 3, name: 'Ujang', specialty: 'Carpenter', rating: 3.5, status: 'Inactive' },
];

function StatusCell({ status }) {
    let color;
    let title;

    switch (status) {
        case 'Active':
            color = 'success';
            title = 'Active';
            break;
        case 'Inactive':
            color = 'error';
            title = 'Inactive';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
}

export default function AkunTukang() {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ name: '', specialty: '', rating: 0, status: 'Active' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditId(null);
        setFormData({ name: '', specialty: '', rating: 0, status: 'Active' });
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
        if (window.confirm('Are you sure you want to delete this tukang?')) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    return (
        <MainCard title="Akun Tukang">
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleOpen}>
                    Add Tukang
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Specialty</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.specialty}</TableCell>
                                <TableCell>
                                    <Rating value={Number(row.rating)} readOnly precision={0.5} size="small" />
                                </TableCell>
                                <TableCell><StatusCell status={row.status} /></TableCell>
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
                <DialogTitle>{editId ? 'Edit Tukang' : 'Add Tukang'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            label="Specialty"
                            fullWidth
                            value={formData.specialty}
                            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        />
                        <Box>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="rating"
                                value={Number(formData.rating)}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setFormData({ ...formData, rating: newValue });
                                }}
                            />
                        </Box>
                        <TextField
                            label="Status"
                            select
                            fullWidth
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            SelectProps={{ native: true }}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </TextField>
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
