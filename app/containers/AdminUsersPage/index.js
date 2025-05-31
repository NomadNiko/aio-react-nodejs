import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { useAuth } from '../AuthProvider';
import preloaderService from '../../utils/preloader';
import messages from './messages';

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props =>
    props.primary ? '#28a745' : props.danger ? '#dc3545' : '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props =>
    props.primary ? '#218838' : props.danger ? '#c82333' : '#0056b3'};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
`;

const Tr = styled.tr`
  &:hover {
    background: #f8f9fa;
  }
`;

const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => {
    switch (props.type) {
      case 'admin':
        return '#dc3545';
      case 'user':
        return '#007bff';
      case 'active':
        return '#28a745';
      case 'inactive':
        return '#6c757d';
      case 'verified':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  }};
  color: white;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  background: ${props => (props.danger ? '#dc3545' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: ${props => (props.danger ? '#c82333' : '#0056b3')};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  background: ${props => (props.active ? '#007bff' : 'white')};
  color: ${props => (props.active ? 'white' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #007bff;
    color: white;
  }

  &:disabled {
    background: #e9ecef;
    color: #6c757d;
    border-color: #dee2e6;
    cursor: not-allowed;
  }
`;

// Modal Components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: normal;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'user',
    isActive: true,
    emailVerified: false,
  });

  // Fetch users with caching support
  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      // Check for cached data first when dynamic loading is enabled
      if (preloaderService.isPreloadingEnabled()) {
        const cachedData = preloaderService.getCachedUsers(currentPage, searchTerm);
        if (cachedData && cachedData.success) {
          setUsers(cachedData.users);
          setTotalPages(cachedData.totalPages);
          setLoading(false);
          return; // Use cached data, no need to fetch
        }
      }

      // Fallback to regular API call if no cached data
      const token = localStorage.getItem('accessToken');
      const response = await fetch(
        `/api/users?page=${currentPage}&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        
        // Cache the data for future use if dynamic loading is enabled
        if (preloaderService.isPreloadingEnabled()) {
          const cacheKey = searchTerm ? `users-search-${searchTerm}` : `users-page-${currentPage}`;
          preloaderService.preloadedData.set(`api-${cacheKey}`, data);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  // Handle create user
  const handleCreateUser = async e => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setShowCreateModal(false);
        fetchUsers();
        resetForm();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to create user');
    }
  };

  // Handle edit user
  const handleEditUser = async e => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password; // Don't send empty password
      }

      const response = await fetch(`/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (data.success) {
        setShowEditModal(false);
        fetchUsers();
        resetForm();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to update user');
    }
  };

  // Handle delete user
  const handleDeleteUser = async userId => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchUsers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  // Handle unlock user
  const handleUnlockUser = async userId => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/users/${userId}/unlock`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchUsers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to unlock user');
    }
  };

  // Open edit modal
  const openEditModal = user => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      password: '',
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
    });
    setShowEditModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'user',
      isActive: true,
      emailVerified: false,
    });
    setEditingUser(null);
  };

  // Handle form change
  const handleFormChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <PageContainer>
      <Helmet>
        <title>User Management</title>
        <meta name="description" content="Admin user management" />
      </Helmet>

      <PageHeader>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <Button primary onClick={() => setShowCreateModal(true)}>
          <FormattedMessage {...messages.createUser} />
        </Button>
      </PageHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      {loading ? (
        <LoadingMessage>
          <FormattedMessage {...messages.loading} />
        </LoadingMessage>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>
                  <FormattedMessage {...messages.name} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.email} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.role} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.status} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.verified} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.lastLogin} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.actions} />
                </Th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <Tr key={user._id}>
                  <Td>
                    {user.firstName} {user.lastName}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Badge type={user.role}>{user.role.toUpperCase()}</Badge>
                  </Td>
                  <Td>
                    <Badge type={user.isActive ? 'active' : 'inactive'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {user.isLocked && (
                      <Badge type="inactive" style={{ marginLeft: '0.5rem' }}>
                        Locked
                      </Badge>
                    )}
                  </Td>
                  <Td>
                    <Badge type={user.emailVerified ? 'verified' : 'inactive'}>
                      {user.emailVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </Td>
                  <Td>
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString()
                      : 'Never'}
                  </Td>
                  <Td>
                    <ActionButtons>
                      <IconButton onClick={() => openEditModal(user)}>
                        Edit
                      </IconButton>
                      {user.isLocked && (
                        <IconButton onClick={() => handleUnlockUser(user._id)}>
                          Unlock
                        </IconButton>
                      )}
                      {user._id !== currentUser.id && (
                        <IconButton
                          danger
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </IconButton>
                      )}
                    </ActionButtons>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PageButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </PageButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <PageButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </PageButton>
          </Pagination>
        </>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <Modal onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <FormattedMessage {...messages.createUserTitle} />
              </ModalTitle>
              <CloseButton onClick={() => setShowCreateModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>

            <form onSubmit={handleCreateUser}>
              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.firstName} />
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.lastName} />
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.email} />
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.password} />
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.role} />
                </Label>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleFormChange}
                  />
                  <FormattedMessage {...messages.activeAccount} />
                </CheckboxLabel>
              </FormGroup>

              <FormGroup>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="emailVerified"
                    checked={formData.emailVerified}
                    onChange={handleFormChange}
                  />
                  <FormattedMessage {...messages.emailVerified} />
                </CheckboxLabel>
              </FormGroup>

              <ModalFooter>
                <Button type="button" onClick={() => setShowCreateModal(false)}>
                  <FormattedMessage {...messages.cancel} />
                </Button>
                <Button primary type="submit">
                  <FormattedMessage {...messages.create} />
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <Modal onClick={() => setShowEditModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <FormattedMessage {...messages.editUserTitle} />
              </ModalTitle>
              <CloseButton onClick={() => setShowEditModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>

            <form onSubmit={handleEditUser}>
              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.firstName} />
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.lastName} />
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.email} />
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.password} />
                  <span style={{ fontWeight: 'normal', fontSize: '0.875rem' }}>
                    {' '}
                    (leave blank to keep current)
                  </span>
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FormattedMessage {...messages.role} />
                </Label>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleFormChange}
                  />
                  <FormattedMessage {...messages.activeAccount} />
                </CheckboxLabel>
              </FormGroup>

              <FormGroup>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="emailVerified"
                    checked={formData.emailVerified}
                    onChange={handleFormChange}
                  />
                  <FormattedMessage {...messages.emailVerified} />
                </CheckboxLabel>
              </FormGroup>

              <ModalFooter>
                <Button type="button" onClick={() => setShowEditModal(false)}>
                  <FormattedMessage {...messages.cancel} />
                </Button>
                <Button primary type="submit">
                  <FormattedMessage {...messages.save} />
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
}

export default AdminUsersPage;
